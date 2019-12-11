# 设计原理

## 执行流程
* 通过sftp或者wget把离线安装包拷贝到目标机器上（masters和nodes）
* 在master0上执行kubeadm init
* 在其它master上执行kubeadm join 并设置控制面，这个过程会在其它master上起etcd并与master0的etcd组成集群，并启动控制组建（apiserver controller等）
* join node节点，会在node上配置ipvs规则，配置/etc/hosts等

   有个细节是所有对apiserver进行访问都是通过域名，因为master上连接自己就行，node需要通过虚拟ip链接多个master，这个每个节点的kubelet与kube-proxy访问apiserver的地址是不一样的，而kubeadm又只能在配置文件中指定一个地址，所以使用一个域名但是每个节点解析不同。

使用域名的好处还有就是IP地址发生变化时仅需要修改解析即可。

## 本地内核负载
通过这样的方式实现每个node上通过本地内核负载均衡访问masters：
```
  +----------+                       +---------------+  virturl server: 127.0.0.1:6443
  | mater0   |<----------------------| ipvs nodes    |    real servers:
  +----------+                      |+---------------+            10.103.97.200:6443
                                    |                             10.103.97.201:6443
  +----------+                      |                             10.103.97.202:6443
  | mater1   |<---------------------+
  +----------+                      |
                                    |
  +----------+                      |
  | mater2   |<---------------------+
  +----------+
```
在node上起了一个lvscare的static pod去守护这个 ipvs, 一旦apiserver不可访问了，会自动清理掉所有node上对应的ipvs规则， master恢复正常时添加回来。

所以在你的node上加了三个东西，可以直观的看到：
```sh
cat /etc/kubernetes/manifests   # 这下面增加了lvscare的static pod
ipvsadm -Ln                     # 可以看到创建的ipvs规则
cat /etc/hosts                  # 增加了虚拟IP的地址解析
```

## 定制kubeadm
对kubeadm改动非常少，主要是证书时间延长和join命令的扩展,主要讲讲join命令的改造：

首先join命令增加--master参数用于指定master地址列表
```go
flagSet.StringSliceVar(
	&locallb.LVScare.Masters, "master", []string{},
	"A list of ha masters, --master 192.168.0.2:6443  --master 192.168.0.2:6443  --master 192.168.0.2:6443",
)
```
这样就可以拿到master地址列表去做ipvs了

如果不是控制节点且不是单master，那么就创建一条ipvs规则,控制节点上不需要创建，连自己的apiserver即可：
```go
if data.cfg.ControlPlane == nil {
    fmt.Println("This is not a control plan")
    if len(locallb.LVScare.Masters) != 0 {
        locallb.CreateLocalLB(args[0])
    }
} 
```

然后再去创建lvscare static pod去守护ipvs:
```go
if len(locallb.LVScare.Masters) != 0 {
    locallb.LVScareStaticPodToDisk("/etc/kubernetes/manifests")
}

```
所以哪怕你不使用sealos，也可以直接用定制过的kubeadm去装集群，只是麻烦一些：

#### kubeadm配置文件
```yaml
apiVersion: kubeadm.k8s.io/v1beta1
kind: ClusterConfiguration
kubernetesVersion: v1.14.0
controlPlaneEndpoint: "apiserver.cluster.local:6443" # apiserver DNS name
apiServer:
        certSANs:
        - 127.0.0.1
        - apiserver.cluster.local
        - 172.20.241.205
        - 172.20.241.206
        - 172.20.241.207
        - 172.20.241.208
        - 10.103.97.1          # virturl ip
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: "ipvs"
ipvs:
        excludeCIDRs: 
        - "10.103.97.1/32" # 注意不加这个kube-proxy会清理你的规则
```
#### master0 10.103.97.100 上
```sh
echo "10.103.97.100 apiserver.cluster.local" >> /etc/hosts # 解析的是master0的地址
kubeadm init --config=kubeadm-config.yaml --experimental-upload-certs  
mkdir ~/.kube && cp /etc/kubernetes/admin.conf ~/.kube/config
kubectl apply -f https://docs.projectcalico.org/v3.6/getting-started/kubernetes/installation/hosted/kubernetes-datastore/calico-networking/1.7/calico.yaml
```

#### master1 10.103.97.101 上
```sh
echo "10.103.97.100 apiserver.cluster.local" >> /etc/hosts #解析的是master0的地址,为了能正常join进去
kubeadm join 10.103.97.100:6443 --token 9vr73a.a8uxyaju799qwdjv \
    --discovery-token-ca-cert-hash sha256:7c2e69131a36ae2a042a339b33381c6d0d43887e2de83720eff5359e26aec866 \
    --experimental-control-plane \
    --certificate-key f8902e114ef118304e561c3ecd4d0b543adc226b7a07f675f56564185ffe0c07 

sed "s/10.103.97.100/10.103.97.101/g" -i /etc/hosts  # 解析再换成自己的地址，否则就都依赖master0的伪高可用了
```

#### master2 10.103.97.102 上，同master1
```sh
echo "10.103.97.100 apiserver.cluster.local" >> /etc/hosts
kubeadm join 10.103.97.100:6443 --token 9vr73a.a8uxyaju799qwdjv \
    --discovery-token-ca-cert-hash sha256:7c2e69131a36ae2a042a339b33381c6d0d43887e2de83720eff5359e26aec866 \
    --experimental-control-plane \
    --certificate-key f8902e114ef118304e561c3ecd4d0b543adc226b7a07f675f56564185ffe0c07  

sed "s/10.103.97.100/10.103.97.101/g" -i /etc/hosts
```

#### nodes 上
join时加上--master指定master地址列表
```sh
echo "10.103.97.1 apiserver.cluster.local" >> /etc/hosts   # 需要解析成虚拟ip
kubeadm join 10.103.97.1:6443 --token 9vr73a.a8uxyaju799qwdjv \
    --master 10.103.97.100:6443 \
    --master 10.103.97.101:6443 \
    --master 10.103.97.102:6443 \
    --discovery-token-ca-cert-hash sha256:7c2e69131a36ae2a042a339b33381c6d0d43887e2de83720eff5359e26aec866
```

## 离线包结构分析
```
.
├── bin  # 指定版本的bin文件，只需要这三个，其它组件跑容器里
│   ├── kubeadm
│   ├── kubectl
│   └── kubelet
├── conf
│   ├── 10-kubeadm.conf  # 这个文件新版本没用到，我在shell里直接生成，这样可以检测cgroup driver
│   ├── kubeadm.yaml # kubeadm的配置文件
│   ├── kubelet.service  # kubelet systemd配置文件
├── images  # 所有镜像包
│   └── images.tar
└── shell
    ├── init.sh  # 初始化脚本
    └── master.sh # 运行master脚本
```
init.sh脚本中拷贝bin文件到$PATH下面，配置systemd，关闭swap防火墙等，然后导入集群所需要的镜像。

master.sh主要执行了kubeadm init

conf下面有有我需要的如kubeadm的配置文件，calico yaml文件等等

sealos会会调用二者。 所以大部分兼容不同版本都可以微调脚本做到。
