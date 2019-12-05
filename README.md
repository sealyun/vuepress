---
home: true
# heroImage: https://sealyun.com/img/logo.png
heroText: sealyun
tagline: 专注于kubernetes安装
actionText: 安装文档 →
actionLink: /docs/
features:
- title: 大道至简
  details: 一个二进制工具加一个资源包，不依赖haproxy keepalived ansible等重量级工具，一条命令就可实现kubernetes高可用集群构建，无论是单节点还是集群，单master还是多master，生产还是测试都能很好支持！简单不意味着阉割功能，照样能全量支持kubeadm所有配置。
- title: 稳定可靠
  details: 99年证书，再也不用担心生产集群证书过期，ipvs负载多master可用性与稳定性更高，我们有上千用户在生产环境中使用sealos, 我们自身也有超过上千台服务器生产环境中使用sealos
- title: 服务至上
  details: 您只需要69元年费会员就可获得跪舔式售后服务，任何安装不成功都可远程协助，即便是用的免费版本也可获得群内实时反馈问题服务,特殊情况下客服在撸代码或在和煞笔领导吵架时不能及时回复谅解
footer: Apache Licensed | Copyright © 皖ICP备14017277号-2 | wechat sealnux
---

# 项目地址

[![fanux/sealos - GitHub](https://gh-card.dev/repos/fanux/sealos.svg)](https://github.com/fanux/sealos)

# 快速开始
> 环境信息

主机名|IP地址
---|---
master0|192.168.0.2 
master1|192.168.0.3 
master2|192.168.0.4 
node0|192.168.0.5 

服务器密码：123456

::: tip kubernetes高可用安装教程
只需要准备好服务器，在任意一台服务器上执行下面命令即可
:::

```sh
# 下载并安装sealos, sealos是个golang的二进制工具，直接下载拷贝到bin目录即可
wget https://github.com/fanux/sealos/releases/download/v3.0.1/sealos && \
    chmod +x sealos && mv sealos /usr/bin 

# 安装一个三master的kubernetes集群
sealos init --passwd 123456 \
	--master 192.168.0.2  --master 192.168.0.3  --master 192.168.0.4  \
	--node 192.168.0.5 \
	--pkg-url https://sealyun.oss-cn-beijing.aliyuncs.com/37374d999dbadb788ef0461844a70151-1.16.0/kube1.16.0.tar.gz \
	--version v1.16.0
```
> 参数含义

参数名|含义|示例
---|---|---
passwd|服务器密码|123456
master|k8s master节点IP地址| 192.168.0.2
node|k8s node节点IP地址|192.168.0.3
pkg-url|离线资源包地址，支持下载到本地，或者一个远程地址|/root/kube1.16.0.tar.gz
version|[资源包](http://store.lameleg.com)对应的版本|v1.16.0

::: tip
系统支持：centos7.2以上 ubuntu16.04以上 内核推荐4.14以上
:::

[更多详情](https://github.com/fanux/sealos)

[其它版本资源包](http://store.lameleg.com)
