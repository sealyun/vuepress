(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{230:function(e,t,a){"use strict";a.r(t);var n=a(0),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"kubernetes高可用相关配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes高可用相关配置"}},[e._v("#")]),e._v(" kubernetes高可用相关配置")]),e._v(" "),a("h2",{attrs:{id:"机器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#机器"}},[e._v("#")]),e._v(" 机器")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("IP")]),e._v(" "),a("th",[e._v("用途")]),e._v(" "),a("th",[e._v("备注")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("10.100.81.11")]),e._v(" "),a("td",[e._v("master、etcd")]),e._v(" "),a("td",[e._v("主节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.12")]),e._v(" "),a("td",[e._v("master、etcd、keepalived、haproxy")]),e._v(" "),a("td",[e._v("主节点，同时部署keepalived、haproxy，保证master高可用")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.13")]),e._v(" "),a("td",[e._v("master、etcd、keepalived、haproxy")]),e._v(" "),a("td",[e._v("主节点，同时部署keepalived、haproxy，保证master高可用")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.14")]),e._v(" "),a("td",[e._v("node、etcd")]),e._v(" "),a("td",[e._v("非业务节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.15")]),e._v(" "),a("td",[e._v("node、etcd")]),e._v(" "),a("td",[e._v("非业务节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.16")]),e._v(" "),a("td",[e._v("node")]),e._v(" "),a("td",[e._v("业务节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.17")]),e._v(" "),a("td",[e._v("node")]),e._v(" "),a("td",[e._v("业务节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.18")]),e._v(" "),a("td",[e._v("node")]),e._v(" "),a("td",[e._v("业务节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.19")]),e._v(" "),a("td",[e._v("node")]),e._v(" "),a("td",[e._v("业务节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.20")]),e._v(" "),a("td",[e._v("node")]),e._v(" "),a("td",[e._v("业务节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.21")]),e._v(" "),a("td",[e._v("node")]),e._v(" "),a("td",[e._v("业务节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.22")]),e._v(" "),a("td",[e._v("node")]),e._v(" "),a("td",[e._v("业务节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.23")]),e._v(" "),a("td",[e._v("node")]),e._v(" "),a("td",[e._v("业务节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.24")]),e._v(" "),a("td",[e._v("node、harbor")]),e._v(" "),a("td",[e._v("业务节点")])]),e._v(" "),a("tr",[a("td",[e._v("10.100.81.25")]),e._v(" "),a("td",[e._v("node")]),e._v(" "),a("td",[e._v("业务节点")])])])]),e._v(" "),a("h2",{attrs:{id:"组件版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组件版本"}},[e._v("#")]),e._v(" 组件版本")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("组件名")]),e._v(" "),a("th",[e._v("版本")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("docker")]),e._v(" "),a("td",[e._v("Docker version 1.12.6, build 78d1802")])]),e._v(" "),a("tr",[a("td",[e._v("kubernetes")]),e._v(" "),a("td",[e._v("v1.10.0")])]),e._v(" "),a("tr",[a("td",[e._v("harbor")]),e._v(" "),a("td",[e._v("v1.2.0")])]),e._v(" "),a("tr",[a("td",[e._v("keepalived")]),e._v(" "),a("td",[e._v("v1.3.5")])]),e._v(" "),a("tr",[a("td",[e._v("haproxy")]),e._v(" "),a("td",[e._v("1.7")])])])]),e._v(" "),a("h2",{attrs:{id:"配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[e._v("#")]),e._v(" 配置")]),e._v(" "),a("p",[e._v("组件配置")]),e._v(" "),a("h3",{attrs:{id:"docker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker"}},[e._v("#")]),e._v(" docker")]),e._v(" "),a("p",[e._v("配置文件：/usr/lib/systemd/system/docker.service")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("[Unit]\nDescription=Docker Application Container Engine\nDocumentation=https://docs.docker.com\nAfter=network.target\n\n[Service]\nType=notify\n# the default is not to use systemd for cgroups because the delegate issues still\n# exists and systemd currently does not support the cgroup feature set required\n# for containers run by docker\nExecStart=/usr/bin/dockerd -H 0.0.0.0:2375 -H unix:///var/run/docker.sock --registry-mirror https://registry.docker-cn.com --insecure-registry 172.16.59.153 --insecure-registry hub.xfyun.cn --insecure-registry k8s.gcr.io --insecure-registry quay.io --default-ulimit core=0:0 --live-restore\nExecReload=/bin/kill -s HUP $MAINPID\n# Having non-zero Limit*s causes performance problems due to accounting overhead\n# in the kernel. We recommend using cgroups to do container-local accounting.\nLimitNOFILE=infinity\nLimitNPROC=infinity\nLimitCORE=infinity\n# Uncomment TasksMax if your systemd version supports it.\n# Only systemd 226 and above support this version.\n#TasksMax=infinity\nTimeoutStartSec=0\n# set delegate yes so that systemd does not reset the cgroups of docker containers\nDelegate=yes\n# kill only the docker process, not all processes in the cgroup\nKillMode=process\n\nMountFlags=slave\n\n[Install]\nWantedBy=multi-user.target\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('--registry-mirror：指定 docker pull 时使用的注册服务器镜像地址,指定为https://registry.docker-cn.com可以加快docker hub中的镜像拉取速度\n--insecure-registry：配置非安全的docker镜像注册服务器\n--default-ulimit：配置容器默认的ulimit选项\n--live-restore：开启此选项，当dockerd服务出现问题时，容器照样运行，服务恢复后，容器也可以再被服务抓到并可管理\nMountFlags=slave：解决移除容器时出现的"Unable to remove filesystem for $id: remove /var/lib/docker/containers/$id/shm: device or resource busy"问题\n')])])]),a("h3",{attrs:{id:"kubernetes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes"}},[e._v("#")]),e._v(" kubernetes")]),e._v(" "),a("h4",{attrs:{id:"etcd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#etcd"}},[e._v("#")]),e._v(" etcd")]),e._v(" "),a("p",[e._v("以10.100.81.11节点为例，其它节点类似：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("apiVersion: v1\nkind: Pod\nmetadata:\n  labels:\n    component: etcd\n    tier: control-plane\n  name: etcd-10.100.81.11\n  namespace: kube-system\nspec:\n  containers:\n  - command:\n    - etcd\n    - --name=infra0\n    - --initial-advertise-peer-urls=http://10.100.81.11:2380\n    - --listen-peer-urls=http://10.100.81.11:2380\n    - --listen-client-urls=http://10.100.81.11:2379,http://127.0.0.1:2379\n    - --advertise-client-urls=http://10.100.81.11:2379\n    - --data-dir=/var/lib/etcd\n    - --initial-cluster-token=etcd-cluster-1\n    - --initial-cluster=infra0=http://10.100.81.11:2380,infra1=http://10.100.81.12:2380,infra2=http://10.100.81.13:2380,infra3=http://10.100.81.14:2380,infra4=http://10.100.81.15:2380\n    - --initial-cluster-state=new\n    image: k8s.gcr.io/etcd-amd64:3.1.12\n    livenessProbe:\n      httpGet:\n        host: 127.0.0.1\n        path: /health\n        port: 2379\n        scheme: HTTP\n      failureThreshold: 8\n      initialDelaySeconds: 15\n      timeoutSeconds: 15\n    name: etcd\n    volumeMounts:\n    - name: etcd-data\n      mountPath: /var/lib/etcd\n  hostNetwork: true\n  volumes:\n  - hostPath:\n      path: /var/lib/etcd\n      type: DirectoryOrCreate\n    name: etcd-data\n")])])]),a("h3",{attrs:{id:"kubernetes系统组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes系统组件"}},[e._v("#")]),e._v(" kubernetes系统组件")]),e._v(" "),a("h4",{attrs:{id:"kubeadm-init-启动k8s集群config-yaml配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubeadm-init-启动k8s集群config-yaml配置"}},[e._v("#")]),e._v(" kubeadm init 启动k8s集群config.yaml配置")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("apiVersion: kubeadm.k8s.io/v1alpha1\nkind: MasterConfiguration\nnetworking:\n  podSubnet: 192.168.0.0/16\napi:\n  advertiseAddress: 10.100.81.11\netcd:\n  endpoints:\n  - http://10.100.81.11:2379 \n  - http://10.100.81.12:2379\n  - http://10.100.81.13:2379\n  - http://10.100.81.14:2379\n  - http://10.100.81.15:2379\n\napiServerCertSANs:\n  - 10.100.81.11\n  - master01.bja.paas\n  - 10.100.81.12\n  - master02.bja.paas\n  - 10.100.81.13\n  - master03.bja.paas\n  - 10.100.81.10\n  \n  - 127.0.0.1\ntoken:\nkubernetesVersion: v1.10.0\napiServerExtraArgs:\n  endpoint-reconciler-type: lease\n  bind-address: 10.100.81.11\n  runtime-config: storage.k8s.io/v1alpha1=true\n  admission-control: NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DefaultTolerationSeconds,NodeRestriction,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota\nfeatureGates:\n  CoreDNS: true\n")])])]),a("h4",{attrs:{id:"kubelet配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubelet配置"}},[e._v("#")]),e._v(" kubelet配置")]),e._v(" "),a("p",[e._v("/etc/systemd/system/kubelet.service.d/10-kubeadm.conf")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('[Service]\nEnvironment="KUBELET_KUBECONFIG_ARGS=--bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf --kubeconfig=/etc/kubernetes/kubelet.conf"\nEnvironment="KUBELET_SYSTEM_PODS_ARGS=--pod-manifest-path=/etc/kubernetes/manifests --allow-privileged=true"\nEnvironment="KUBELET_NETWORK_ARGS=--network-plugin=cni --cni-conf-dir=/etc/cni/net.d --cni-bin-dir=/opt/cni/bin"\nEnvironment="KUBELET_DNS_ARGS=--cluster-dns=10.96.0.10 --cluster-domain=cluster.local"\nEnvironment="KUBELET_AUTHZ_ARGS=--authorization-mode=Webhook --client-ca-file=/etc/kubernetes/pki/ca.crt"\nEnvironment="KUBELET_CADVISOR_ARGS=--cadvisor-port=0"\nEnvironment="KUBELET_CGROUP_ARGS=--cgroup-driver=cgroupfs"\nEnvironment="KUBELET_CERTIFICATE_ARGS=--rotate-certificates=true --cert-dir=/var/lib/kubelet/pki --eviction-hard=memory.available<5%,nodefs.available<5%,imagefs.available<5%"\nExecStart=\nExecStart=/usr/bin/kubelet $KUBELET_KUBECONFIG_ARGS $KUBELET_SYSTEM_PODS_ARGS $KUBELET_NETWORK_ARGS $KUBELET_DNS_ARGS $KUBELET_AUTHZ_ARGS $KUBELET_CADVISOR_ARGS $KUBELET_CGROUP_ARGS $KUBELET_CERTIFICATE_ARGS $KUBELET_EXTRA_ARGS\n\n')])])]),a("h3",{attrs:{id:"keepalived"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keepalived"}},[e._v("#")]),e._v(" keepalived")]),e._v(" "),a("p",[e._v("keepalived采取直接在物理机部署，使用"),a("code",[e._v("yum install keepalived")]),e._v("安装。")]),e._v(" "),a("p",[e._v("启动配置文件：/etc/keepalived/keepalived.conf。keepalived的MASTER和BACKUP配置有部分差异")]),e._v(" "),a("p",[e._v("MASTER")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('! Configuration File for keepalived\n\nglobal_defs {\n   notification_email {\n     root@localhost\n   }\n   router_id master02\n}\n\nvrrp_script chk_haproxy {\n       script "/etc/keepalived/haproxy_check.sh"\n       interval 3\n       weight -20\n}\n\nvrrp_instance VI_1 {\n    state MASTER    # BACKUP节点改成BACKUP\n    interface bond1\n    virtual_router_id 151\n    priority 110    # BACKUP节点改成100\n    advert_int 1\n    authentication {\n        auth_type PASS\n        auth_pass 1111\n    }\n    virtual_ipaddress {\n       10.100.81.10 # k8s使用的VIP\n       10.100.81.9  # 数据库组件使用的VIP\n    }\n    track_script {\n       chk_haproxy\n    }\n}\n\n')])])]),a("p",[e._v("haproxy检查脚本：/etc/keepalived/haproxy_check.sh")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("#!/bin/bash\n\nif [ `ps -C haproxy --no-header |wc -l` -eq 0 ] ; then\n    docker restart k8s-haproxy\n    sleep 2\n    if [ `ps -C haproxy --no-header |wc -l` -eq 0 ] ; then\n        service keepalived stop\n    fi\nfi\n")])])]),a("h3",{attrs:{id:"haproxy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#haproxy"}},[e._v("#")]),e._v(" haproxy")]),e._v(" "),a("p",[e._v("haproxy以容器的形式启动，启动命令如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("docker run -d --net host --name k8s-haproxy -v /etc/haproxy:/usr/local/etc/haproxy:ro haproxy:1.7\n")])])]),a("p",[e._v("haproxy配置文件：/etc/haproxy/haproxy.conf")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("global\n  daemon\n  log 127.0.0.1 local0\n  log 127.0.0.1 local1 notice\n  maxconn 4096\n\ndefaults\n  log               global\n  retries           3\n  maxconn           2000\n  timeout connect   5s\n  timeout client    50s\n  timeout server    50s\n\nfrontend k8s\n  bind *:6444\n  mode tcp\n  default_backend k8s-backend\n\nbackend k8s-backend\n  balance roundrobin\n  mode tcp\n  server k8s-1 10.100.81.11:6443 check\n  server k8s-2 10.100.81.12:6443 check\n  server k8s-3 10.100.81.13:6443 check\n")])])]),a("h2",{attrs:{id:"部署完成后操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#部署完成后操作"}},[e._v("#")]),e._v(" 部署完成后操作")]),e._v(" "),a("h3",{attrs:{id:"修改kube-proxy-configmap"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修改kube-proxy-configmap"}},[e._v("#")]),e._v(" 修改kube-proxy configmap")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl edit configmap kube-proxy -n kube-system\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v(".....\nkubeconfig.conf: |-\n  apiVersion: v1\n  kind: Config\n  clusters:\n  - cluster:\n      certificate-authority: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt\n      server: https://10.100.81.10:6444  # 更改此行ip为vip,改成10.100.81.10\n    name: default\n  contexts:\n  - context:\n      cluster: default\n      namespace: default\n      user: default\n    name: default\n  current-context: default\n  users:\n  - name: default\n    user:\n      tokenFile: /var/run/secrets/kubernetes.io/serviceaccount/token\n......\n")])])]),a("p",[e._v("执行如下命令让kube-proxy组件重新启动")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl get pod -n kube-system | grep kube-proxy | awk '{print $1}' | xargs kubectl delete pod -n kube-system\n")])])]),a("h3",{attrs:{id:"修改所有node节点kubelet-conf"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修改所有node节点kubelet-conf"}},[e._v("#")]),e._v(" 修改所有node节点kubelet.conf")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("/etc/kubernetes/kubelet.conf\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("apiVersion: v1\nclusters:\n- cluster:\n    certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUN5RENDQWJDZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRFNE1EVXhPREF4TXpNME1Gb1hEVEk0TURVeE5UQXhNek0wTUZvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTGJoCmw1TDRaNHFiWTJ3MmY5TFlEb0ZqVlhhcHRhYklkQmZmTS9zMTJaWFd1NU5LYWlPR09ub3RxK1gwM0VJb3Z4VEkKUGh5NzBqY294VGlLUTk5ZkFsUS82a2Vhc0x5MDNGZXJvYkhmaldUenBkZE5mWVNEZStMazlMV0hIZ0phOXVUQQpDU3kyay9sZGo3VWQ0Sk9pMi9lcGhVTUNNMUNlbmdPeWZDNUl0SUpFZzJmMk95cTE5U0JBeW1zYzFTalg5Q0F6CnNyMlhiTm9hK1lVS2Flek1QSldvYlNxdEg0czQ1TkluYytMREJFTkk4VGVITktybENsamdIeUorUjU1V2pCTW8KeSs3Y1BxL2cwTkxmSU4xRjJVbkFFa3RTSmVYUFBSaGlQUUhJcGRBU0xySXhVcE9HNlN3Yk51bmRGdGsxaUJiUgpUSW9md2UyT0VhZkhySmV5OHJrQ0F3RUFBYU1qTUNFd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFLME1mOFM5VjUyaG9VZ3JYcGQyK09rOHF2Ny8KR3hpWnRFelFISW9RdWRLLzJ2ZGJHbXdnem10V3hFNHRYRWQyUnlXTTZZR1VQSmNpMmszY1Z6QkpSaGcvWFB2UQppRVBpUDk5ZkdiM0kxd0QyanlURWVaZVd1ekdSRDk5ait3bStmcE9wQzB2ZU1LN3hzM1VURjRFOFlhWGcwNmdDCjBXTkFNdTRxQmZaSUlKSEVDVDhLUlB5TEN5Zlgvbm84Q25WTndaM3pCbGZaQmFONGZaOWw0UUdGMVd4dlc0OHkKYmpvRDhqUVJnL1kwYUVUMWMrSEhpWTNmNDF0dG9kMWJoSWR3c1NDNUhhRjJQSVAvZ2dCSnZ2Uzh2V1cwcVRDegpDV2EzcVJ0bVB0MHdtcEZic2RPWmdsWkl6aWduYTdaaDFWMDJVM0VFZ2kwYjNGZWR5OW5MRUZaMGJZbz0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=\n    server: https://10.100.81.10:6444   # 此处改为VIP加haproxy监听端口6444\n  name: default-cluster\ncontexts:\n- context:\n    cluster: default-cluster\n    namespace: default\n    user: default-auth\n  name: default-context\ncurrent-context: default-context\nkind: Config\npreferences: {}\nusers:\n- name: default-auth\n  user:\n    client-certificate: /var/lib/kubelet/pki/kubelet-client.crt\n    client-key: /var/lib/kubelet/pki/kubelet-client.key\n")])])]),a("h2",{attrs:{id:"部署前注意事项"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#部署前注意事项"}},[e._v("#")]),e._v(" 部署前注意事项")]),e._v(" "),a("h3",{attrs:{id:"_1-确保所有节点时间同步"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-确保所有节点时间同步"}},[e._v("#")]),e._v(" 1. 确保所有节点时间同步")]),e._v(" "),a("h3",{attrs:{id:"_2-确保所有节点ip转发功能打开"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-确保所有节点ip转发功能打开"}},[e._v("#")]),e._v(" 2. 确保所有节点ip转发功能打开")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("net.ipv4.ip_forward = 1\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);