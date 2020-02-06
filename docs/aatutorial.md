# 使用教程
## 前提条件
* 安装并启动docker, 高版本离线包自带docker，如没安装docker会自动安装
* 下载[kubernetes 离线安装包](http://store.lameleg.com). 
* 下载[最新版本sealos](https://github.com/fanux/sealos/releases).
* 务必同步服务器时间
* 主机名不可重复
* master节点CPU必须2C以上

## 安装教程
多master HA:
```sh
sealos init --master 192.168.0.2 \
    --master 192.168.0.3 \
    --master 192.168.0.4 \
    --node 192.168.0.5 \
    --user root \
    --passwd your-server-password \
    --version v1.14.1 \
    --pkg-url /root/kube1.14.1.tar.gz     
```

或者单master多node:
```sh
sealos init --master 192.168.0.2 \
    --node 192.168.0.5 \
    --user root \
    --passwd your-server-password \
    --version v1.14.1 \
    --pkg-url /root/kube1.14.1.tar.gz 
```

使用免密钥或者密钥对：
```sh
sealos init --master 172.16.198.83 \
    --node 172.16.198.84 \
    --pkg-url https://YOUR_HTTP_SERVER/kube1.15.0.tar.gz \
    --pk /root/kubernetes.pem \
    --version v1.15.0
```

自定义ssh端口号,如2022：
```sh
sealos init --master 172.16.198.83:2022 \
    --pkg-url https://YOUR_HTTP_SERVER/kube1.15.0.tar.gz \
    --pk /root/kubernetes.pem \
    --version v1.15.0
```

```
--master   master服务器地址列表
--node     node服务器地址列表
--user     服务器ssh用户名
--passwd   服务器ssh用户密码
--pkg-url  离线包位置，可以放在本地目录，也可以放在一个http服务器上，sealos会wget到安装目标机
--version  kubernetes版本
--pk       ssh私钥地址，配置免密钥默认就是/root/.ssh/id_rsa
```

其它参数:
```
 --kubeadm-config string   kubeadm-config.yaml kubeadm配置文件，可自定义kubeadm配置文件
 --vip string              virtual ip (default "10.103.97.2") 本地负载时虚拟ip，不推荐修改，集群外不可访问
```

检查安装是否正常:
```sh
[root@iZj6cdqfqw4o4o9tc0q44rZ ~]# kubectl get node
NAME                      STATUS   ROLES    AGE     VERSION
izj6cdqfqw4o4o9tc0q44rz   Ready    master   2m25s   v1.14.1
izj6cdqfqw4o4o9tc0q44sz   Ready    master   119s    v1.14.1
izj6cdqfqw4o4o9tc0q44tz   Ready    master   63s     v1.14.1
izj6cdqfqw4o4o9tc0q44uz   Ready    <none>   38s     v1.14.1
[root@iZj6cdqfqw4o4o9tc0q44rZ ~]# kubectl get pod --all-namespaces
NAMESPACE     NAME                                              READY   STATUS    RESTARTS   AGE
kube-system   calico-kube-controllers-5cbcccc885-9n2p8          1/1     Running   0          3m1s
kube-system   calico-node-656zn                                 1/1     Running   0          93s
kube-system   calico-node-bv5hn                                 1/1     Running   0          2m54s
kube-system   calico-node-f2vmd                                 1/1     Running   0          3m1s
kube-system   calico-node-tbd5l                                 1/1     Running   0          118s
kube-system   coredns-fb8b8dccf-8bnkv                           1/1     Running   0          3m1s
kube-system   coredns-fb8b8dccf-spq7r                           1/1     Running   0          3m1s
kube-system   etcd-izj6cdqfqw4o4o9tc0q44rz                      1/1     Running   0          2m25s
kube-system   etcd-izj6cdqfqw4o4o9tc0q44sz                      1/1     Running   0          2m53s
kube-system   etcd-izj6cdqfqw4o4o9tc0q44tz                      1/1     Running   0          118s
kube-system   kube-apiserver-izj6cdqfqw4o4o9tc0q44rz            1/1     Running   0          2m15s
kube-system   kube-apiserver-izj6cdqfqw4o4o9tc0q44sz            1/1     Running   0          2m54s
kube-system   kube-apiserver-izj6cdqfqw4o4o9tc0q44tz            1/1     Running   1          47s
kube-system   kube-controller-manager-izj6cdqfqw4o4o9tc0q44rz   1/1     Running   1          2m43s
kube-system   kube-controller-manager-izj6cdqfqw4o4o9tc0q44sz   1/1     Running   0          2m54s
kube-system   kube-controller-manager-izj6cdqfqw4o4o9tc0q44tz   1/1     Running   0          63s
kube-system   kube-proxy-b9b9z                                  1/1     Running   0          2m54s
kube-system   kube-proxy-nf66n                                  1/1     Running   0          3m1s
kube-system   kube-proxy-q2bqp                                  1/1     Running   0          118s
kube-system   kube-proxy-s5g2k                                  1/1     Running   0          93s
kube-system   kube-scheduler-izj6cdqfqw4o4o9tc0q44rz            1/1     Running   1          2m43s
kube-system   kube-scheduler-izj6cdqfqw4o4o9tc0q44sz            1/1     Running   0          2m54s
kube-system   kube-scheduler-izj6cdqfqw4o4o9tc0q44tz            1/1     Running   0          61s
kube-system   kube-sealyun-lvscare-izj6cdqfqw4o4o9tc0q44uz      1/1     Running   0          86s
```

## 清理
```sh
sealos clean \
    --master 192.168.0.2 \
    --master 192.168.0.3 \
    --master 192.168.0.4 \
    --node 192.168.0.5 \
    --user root \
    --passwd your-server-password
```
## [视频教程](http://mp.weixin.qq.com/mp/video?__biz=Mzg2NzAzODE5Ng==&mid=100000268&sn=e932ef75dfc38414c21b6b365df07c8e&vid=wxv_1003349861900664832&idx=1&vidsn=e934d4cf8bacd1f569514b69c1344cf6&fromid=1&scene=18&xtrack=1#wechat_redirect)

## 增加节点
无论是增加master还是增加node，都需要先导入二进制和镜像文件，把资源包拷贝到新的节点上执行：
```
tar zxvf kube1.17.0.tar.gz
cd kube/shell && sh init.sh
```

## 增加node节点
获取 join command, 在master上执行:
```
kubeadm token create --print-join-command
```

可以使用super kubeadm, 但是join时需要增加一个`--master` 参数:
```sh
cd kube/shell && init.sh
echo "10.103.97.2 apiserver.cluster.local" >> /etc/hosts   # using vip
kubeadm join 10.103.97.2:6443 --token 9vr73a.a8uxyaju799qwdjv \
    --master 10.103.97.100:6443 \
    --master 10.103.97.101:6443 \
    --master 10.103.97.102:6443 \
    --discovery-token-ca-cert-hash sha256:7c2e69131a36ae2a042a339b33381c6d0d43887e2de83720eff5359e26aec866
```

也可以用sealos join命令：
```sh
sealos join 
    --master 192.168.0.2 \
    --master 192.168.0.3 \
    --master 192.168.0.4 \
    --vip 10.103.97.2 \       
    --node 192.168.0.5 \            
    --user root \             
    --passwd your-server-password \
    --pkg-url /root/kube1.15.0.tar.gz 
```

## 增加master节点
获取join master命令：

先用下面命令拿到key，这个安装时日志也会输出，忘记保存就用下面命令获取
```sh
kubeadm init phase upload-certs --upload-certs
W1216 09:06:54.668668   14269 validation.go:28] Cannot validate kube-proxy config - no validator is available
W1216 09:06:54.668720   14269 validation.go:28] Cannot validate kubelet config - no validator is available
[upload-certs] Storing the certificates in Secret "kubeadm-certs" in the "kube-system" Namespace
[upload-certs] Using certificate key:
5e091dae31844423d69d585a6f3898356b8d9ff1dfd727c2ffee7244463d0c2d
```

然后就下面命令获取join命令：
```sh
kubeadm token create --certificate-key 5e091dae31844423d69d585a6f3898356b8d9ff1dfd727c2ffee7244463d0c2d --print-join-command
W1216 09:08:10.104418   16674 validation.go:28] Cannot validate kube-proxy config - no validator is available
W1216 09:08:10.104457   16674 validation.go:28] Cannot validate kubelet config - no validator is available
kubeadm join apiserver.cluster.local:6443 --token o1mq4r.b9ff55967s737jxm     --discovery-token-ca-cert-hash sha256:5c1a852e612cbaf2921364095e06b3d9e7f52ca67b7397abfa48cd0de7eb4ed1     --control-plane --certificate-key 5e091dae31844423d69d585a6f3898356b8d9ff1dfd727c2ffee7244463d0c2d
```
不要直接执行输出的命令，请往下看：

增加master节点稍微麻烦一点, 如新加一个master 10.103.97.102, 10.103.97.100是master0：

master2 10.103.97.102 上
```sh
echo "10.103.97.100 apiserver.cluster.local" >> /etc/hosts
kubeadm join 10.103.97.100:6443 --token o1mq4r.b9ff55967s737jxm  \
    --discovery-token-ca-cert-hash sha256:5c1a852e612cbaf2921364095e06b3d9e7f52ca67b7397abfa48cd0de7eb4ed1  \
    --control-plane \
    --certificate-key 5e091dae31844423d69d585a6f3898356b8d9ff1dfd727c2ffee7244463d0c2d

sed "s/10.103.97.100/10.103.97.101/g" -i /etc/hosts
```
注意：1.15以下用--experimental-control-plane 代替--control-plane

这时新的master便加进去了，但是node的本地负载也需要加一下这个master,所有节点修改一下lvscare配置即可在node /etc/kubernetes/manifests目录下。

```sh
vim  /etc/kubernetes/manifests/kube-sealyun-lvscare-xxx
增加 --rs 10.103.97.102:6443
```
ipvsadm -Ln 就可以在node上看到新的master已经代理上了

## 自定义网络

* podcidr 参数指定自定义pod网段 如 --podcidr 100.64.0.0/10
* svccidr 参数指定clusterip网段 如 --svccidr 10.96.0.0/12
* without-cni sealos自带calico网络，如果你想自己装CNI不用默认可加此参数， 如 sealos init --without-cni .....

## 使用自定义kubeadm配置文件
比如我们需要在证书里加入 `sealyun.com`:

先获取配置文件模板：
```sh
sealos config -t kubeadm >>  kubeadm-config.yaml.tmpl
```
修改`kubeadm-config.yaml.tmpl`,文件即可， 编辑增加 `sealyun.com`, 注意其它部分不用动，sealos会自动填充模板里面的内容:
```yaml
apiVersion: kubeadm.k8s.io/v1beta1
kind: ClusterConfiguration
kubernetesVersion: {{.Version}}
controlPlaneEndpoint: "apiserver.cluster.local:6443"
networking:
  podSubnet: 100.64.0.0/10
apiServer:
        certSANs:
        - sealyun.com # this is what I added
        - 127.0.0.1
        - apiserver.cluster.local
        {{range .Masters -}}
        - {{.}}
        {{end -}}
        - {{.VIP}}
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: "ipvs"
ipvs:
        excludeCIDRs: 
        - "{{.VIP}}/32"
```

使用 --kubeadm-config 指定配置文件模板即可:
```sh
sealos init --kubeadm-config kubeadm-config.yaml.tmpl \
    --master 192.168.0.2 \
    --master 192.168.0.3 \
    --master 192.168.0.4 \
    --node 192.168.0.5 \
    --user root \
    --passwd your-server-password \
    --version v1.14.1 \
    --pkg-url /root/kube1.14.1.tar.gz 
```
