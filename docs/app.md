# 应用安装
## 安装APP如dashboard ingress

我们把诸如dashboard,prometheus,ingress等等都称之为APP

所有APP都可使用类似 `sealos install --pkg-url dashboard.tar`的方式安装

为什么不直接kubectl apply? 因为我们把镜像与配置文件和一些脚本都放入tar包中来保障一致性，并可以在没有镜像仓库的情况下帮用户导入镜像

还有就是很多情况下不可避免的要在执行完yaml之后执行一些命令，如安装完dashboard获取token这些

APP名|安装示例
---|---
[kuboard](https://github.com/sealstore/dashboard/tree/kuboard) | sealos install --pkg-url https://github.com/sealstore/dashboard/releases/download/v1.0-1/kuboard.tar
[dashboard](https://github.com/sealstore/dashboard/tree/dashboard) | sealos install --pkg-url https://github.com/sealstore/dashboard/releases/download/v2.0.0-bata5/dashboard.tar
[prometheus](https://github.com/sealstore/prometheus) | sealos install --pkg-url https://github.com/sealstore/prometheus/releases/download/v0.31.1/prometheus.tar
[ingress](https://github.com/sealstore/ingress) | sealos install --pkg-url https://github.com/sealstore/ingress/releases/download/v0.15.2/contour.tar

## dashboard访问
使用上述命令安装完dashboard后日志中会输出token，登录页面时需要使用.

https://你的master地址:32000 chrome访问不了就用火狐

或者使用此命令获取token
```sh
kubectl get secret -nkubernetes-dashboard \
    $(kubectl get secret -n kubernetes-dashboard|grep dashboard-token |awk '{print $1}') \
    -o jsonpath='{.data.token}'  | base64 --decode
```

## APP离线包原理
```$xslt
tar cvf dashboard.tar config dashboard.tar.gz
```
```
dashboard.tar
   dashboard.tar.gz # 包含所有镜像文件，yaml文件，配置文件脚本，具体是什么sealos不关心 
   config           # sealos install 配置文件
```

config 文件内容：
```
# APPLY指令只会在能访问apiserver的节点执行一次
APPLY kubectl apply -k manifests
# LOAD会在sealos过滤出来的每个节点上执行
LOAD docker load -i images.tar
# DELETE 命令只会在能访问apiserver节点执行一次
DELETE kubectl delete -k manifests
# 删除命令，sealos remove命令会调用
REMOVE docker rmi dashboard:2.0.0
```

指令说明：

指令 | 作用 | 事例 |在过滤出来的每个节点执行 | 只针对apiserver执行一次 
--- | ---| ---|---|---
LOAD | 如导入镜像 | docker load -i images.tar | ✓ |x
START | 如启动docker | systemctl start docker |✓ |x 
STOP | 如停止docker | systemctl stop docker | ✓ | x
REMOVE | 如清理镜像 | docker rmi -f ...| ✓ |x
APPLY | 如部署yaml文件 | kubectl apply -k . | x| ✓
DELETE | 如删除yaml | kubectl delete -f . | x |✓

# 安装
```$xslt
sealos install --pkg-url dashboard.tar --label role=master --cmd "APPLY kubectl apply -k manifests" --cmd "LOAD docker load -i images.tar"
```
* --pkg 支持本地与http
* --label 过滤出k8s集群中指定节点 [开发中]
* --cmd 会覆盖config中的指令      [开发中]

或者使用kustomize替换包内镜像版本
```
sealos install --pkg-url prometheus.tar --cmd \
        "APPLY kustomize edit set image sealyun/fist:1.0=sealyun/fist:2.0 && kubectl apply -k manifests"
```

## 配置文件
~/.sealos/config.yaml
sealos init (3.0.1以上版本)时把相关参数存入配置文件, 供执行clean, install命令使用

## dashboard 包制作事例

1. 创建工作目录

```cassandraql
mkdir dashboard && cd dashboard
```

2. 编辑配置文件

```cassandraql
echo "LOAD docker load -i image.tar" >> config
echo "APPLY kubectl apply -f dashboard.yaml" >> config
echo "DELETE kubectl delete -f dashboard.yaml" >> config
echo "REMOVE sleep 10 && docker rmi -f dashboard:latest" >> config
```

3. 下载yaml文件与保存镜像

```cassandraql
wget https://..../dashboard.yaml 
docker save -o image.tar dashboard:latest
```

4. 打包

```cassandraql
tar cvf dashboard.tar config dashboard.yaml image.tar
```

5. 安装使用

```cassandraql
sealos install --pkg-url ./dashboard.tar
```
