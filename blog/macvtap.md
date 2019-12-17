# macvtap实践教程

macvtap是虚拟机网络虚拟化常用的一种技术，当然容器也可以用. MACVTAP 的实现基于传统的 MACVLAN. 和 TAP 设备一样，每一个 MACVTAP 设备拥有一个对应的 Linux 字符设备，并拥有和 TAP 设备一样的 IOCTL 接口，因此能直接被 KVM/Qemu使用，方便地完成网络数据交换工作. 引入 MACVTAP 设备的目标是：简化虚拟化环境中的交换网络，代替传统的 Linux TAP 设备加 Bridge 设备组合，同时支持新的虚拟化网络技术，如 802.1 Qbg.

<!--more-->

如kata的虚拟化网络就用了这个技术，以下实践完就会对kata的网络原理比较清楚了，建议对照教程动手实践.

# 实验环境介绍
![](/macvtap.jpg)
此图非常重要，读整篇文章最好脑海里都有
# 初始化环境
## qemu libvirt环境
我已经做好了qemu libvirt的镜像，大家可以直接使用：
在容器中有非常多的好处，环境如果乱了可以快速恢复干净的环境。
使用设备对也可减少对宿主机网络的影响。
```
docker run -d --privileged -v /dev:/dev -v /home/fanux:/root --name qemu-vm fanux/libvirt:latest init
```
注意：
1. 网络等操作需要容器有特权模式
2. tap网络需要挂载/dev目录
3. /home/fanux可以作为工作目录，镜像自己编写的libvirt配置等放在里面防止删除容器后丢失
4. 由于libvirt需要systemd所以我们在容器中启动init进程

也可自己构建镜像，我提供了一个Dockerfile, -j参数根据你机器CPU来设置编译时的线程数:
```
FROM centos:7.6.1810
RUN yum install -y wget && wget https://download.qemu.org/qemu-4.0.0.tar.xz && \
    tar xvJf qemu-4.0.0.tar.xz  \
    && yum install -y automake gcc-c++ gcc make autoconf libtool gtk2-devel \
    && cd qemu-4.0.0 \
    && ./configure \
    && make -j 72 && make install \
    && yum install -y bridge-utils && yum install -y net-tools tunctl iproute && yum -y install openssh-clients \
    cd .. && rm qemu-4.0.0.tar.xz && rm -rf qemu-4.0.0
RUN yum install -y libvirt virt-manager gustfish openssh-clients
```

## 虚拟机镜像
进入容器
```
[root@compute84 libvirt]# docker exec -it qemu-vm bash
bash-4.2# cd
bash-4.2# ls
CentOS-7-x86_64-GenericCloud.qcow2     centos.qcow2	    image    nohup.out	start.sh  vm3.xml
CentOS-7-x86_64-Minimal-1810.iso       cloud-init-start.sh  kernel   qemu	vm.xml
Fedora-Cloud-Base-30-1.2.x86_64.qcow2  destroy.sh	    libvirt  run.sh	vm2.xml
```
下载虚拟机镜像：

openstack已经提供很多已经装过cloud-init的镜像，地址：
https://docs.openstack.org/image-guide/obtain-images.html

我用的一个比较新的centos的qcow2格式镜像：
```
wget http://cloud.centos.org/centos/7/images/CentOS-7-x86_64-GenericCloud-1905.qcow2
```
修改虚拟机root密码：
```
virt-customize -a CentOS-7-x86_64-GenericCloud.qcow2 --root-password password:coolpass
```

## 启动虚拟机
查看容器网络信息：
```
bash-4.2# systemctl start libvirtd
bash-4.2# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: virbr0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default qlen 1000
    link/ether 52:54:00:c6:59:47 brd ff:ff:ff:ff:ff:ff
    inet 192.168.122.1/24 brd 192.168.122.255 scope global virbr0
       valid_lft forever preferred_lft forever
3: virbr0-nic: <BROADCAST,MULTICAST> mtu 1500 qdisc pfifo_fast master virbr0 state DOWN group default qlen 1000
    link/ether 52:54:00:c6:59:47 brd ff:ff:ff:ff:ff:ff
1310: eth0@if1311: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.2/16 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:acff:fe11:2/64 scope link 
       valid_lft forever preferred_lft forever
```
1,2,3是libvirt创建的可以忽略，最主要是eth0

### 编写libvirt配置
vm3.xml:
```
<domain type='kvm'>
  <name>vm3</name>
  <memory unit='MiB'>2048</memory>
  <currentMemory unit='MiB'>2048</currentMemory>
  <os>
    <type arch='x86_64'>hvm</type>
    <boot dev='hd'/>
  </os>
  <clock offset='utc'/>
  <on_poweroff>destroy</on_poweroff>
  <on_reboot>restart</on_reboot>
  <on_crash>destroy</on_crash>
  <devices>
    <emulator>/usr/local/bin/qemu-system-x86_64</emulator>
  <disk type='file' device='disk'>
       <driver name='qemu' type='qcow2'/>
       <source file='/root/CentOS-7-x86_64-GenericCloud.qcow2'/>
       <target dev='vda' bus='virtio'/>
  </disk>
  <interface type='direct'> 
    <source dev='eth0' mode='bridge' /> 
    <model type='virtio' />    
    <driver name='vhost' /> 
  </interface>
  <serial type='pty'>
    <target port='0'/>
  </serial>
  <console type='pty'>
    <target type='serial' port='0'/>
  </console>
  </devices>
</domain>
```
这里配置正确镜像地址，interface的地方是macvtap相关的配置。

### 启动虚拟机
```
bash-4.2# virsh define vm3.xml 
Domain vm3 defined from vm3.xml
bash-4.2# virsh start vm3     
Domain vm3 started
```
启动完后就可以看到macvtap设备被创建出来了
```
bash-4.2# ip addr
7: macvtap0@eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 500
    link/ether 52:54:00:56:e4:20 brd ff:ff:ff:ff:ff:ff
    inet6 fe80::5054:ff:fe56:e420/64 scope link 
       valid_lft forever preferred_lft forever
```
进入到虚拟机：
```
virsh console vm3
```
如果卡在这一步：
```
A start job is running for LSB: Bri... networking
cloud-init[2253]: 2019-06-27 08:37:09,971 - url_helper.py[WARNING]: Calling 'http://192.168.122.1/latest/meta-data/instance-id' failed [87/120s]: request error
```
等它超时就好，因为macvtap时我们需要进入虚拟机去配置网络。
然后就可以进入虚拟机了：
```
CentOS Linux 7 (Core)
Kernel 3.10.0-957.1.3.el7.x86_64 on an x86_64

localhost login: root
Password: 
Last login: Thu Jun 27 07:19:32 from gateway
```
密码是我们上面设置的镜像密码：coolpass

### 配置虚拟机IP
```
[root@localhost ~]# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 52:54:00:56:e4:20 brd ff:ff:ff:ff:ff:ff
    inet6 fe80::5054:ff:fe56:e420/64 scope link 
       valid_lft forever preferred_lft forever
```
```
[root@localhost ~]# ip addr add 172.17.0.2/16 dev eth0
[root@localhost ~]# ip route add default via 172.17.0.1 dev eth0
[root@localhost ~]# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 52:54:00:56:e4:20 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::5054:ff:fe56:e420/64 scope link 
       valid_lft forever preferred_lft forever
[root@localhost ~]# ip route 
default via 172.17.0.1 dev eth0 
172.17.0.0/16 dev eth0 proto kernel scope link src 172.17.0.2 
[root@localhost ~]# ping 172.17.0.1
PING 172.17.0.1 (172.17.0.1) 56(84) bytes of data.
64 bytes from 172.17.0.1: icmp_seq=1 ttl=64 time=0.622 ms
64 bytes from 172.17.0.1: icmp_seq=2 ttl=64 time=0.194 ms
```
配置完后就可以ping通网关了。

#### 修改DNS配置
这个不改可能会导致ssh时非常慢：
```
[root@localhost ~]# cat /etc/resolv.conf 
; Created by cloud-init on instance boot automatically, do not edit.
;
; generated by /usr/sbin/dhclient-script
nameserver 114.114.114.114
```
#### 修改sshd配置
修改/etc/ssh/sshd-config文件，将其中的PermitRootLogin no修改为yes，PubkeyAuthentication yes修改为no，AuthorizedKeysFile .ssh/authorized_keys前面加上#屏蔽掉，PasswordAuthentication no修改为yes就可以了。

#### 启动ssh客户端容器
```
docker run --rm -it fanux/libvirt bash
[root@ee18547e9ed2 /]# ssh root@172.17.0.2
ssh: connect to host 172.17.0.2 port 22: Connection refused
```
会发现不通, 这是因为容器里的eth0和虚拟机里的eth0都配置了相同的地址导致，只需要把容器里的eth0地址删掉即可：
```
bash-4.2# ip addr del 172.17.0.2/16 dev eth0
```
再次ssh即可进入虚拟机：
```
[root@ee18547e9ed2 /]# ssh root@172.17.0.2
The authenticity of host '172.17.0.2 (172.17.0.2)' can't be established.
ECDSA key fingerprint is SHA256:kTk3yy8588WQHNtwpzS+h6u0W3RELWC8hJQwIwLOkdc.
ECDSA key fingerprint is MD5:0c:f3:b5:69:c6:08:05:14:f8:da:42:2f:85:29:51:d0.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '172.17.0.2' (ECDSA) to the list of known hosts.
root@172.17.0.2's password: 
Last login: Thu Jun 27 08:38:00 2019
[root@localhost ~]# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 52:54:00:56:e4:20 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::5054:ff:fe56:e420/64 scope link 
       valid_lft forever preferred_lft forever
```

#### 修改虚拟机mac地址
```
[root@localhost ~]# ip link set eth0 address 52:54:00:56:e4:23
```
会发现就连不上虚拟机了

改回：
```
[root@localhost ~]# ip link set eth0 address 52:54:00:56:e4:20
```
又可正常连接了，为啥？

这是因为虚拟机的eth0的mac地址是必须与macvtap0的mac地址保持一样，原理很简单

1. ARP时问IP地址是172.17.0.2的机器mac地址是什么
2. 虚拟机回了一个52:54:00:56:e4:20
3. macvtap0是可以理解成挂在网桥端口上的，这样就把包发给macvtap0了（因为mac地址一样,不一样就不会发给macvtap了）
4. macvtap0就把包丢给qemu应用进程（最终到虚拟机eth0）

## 裸用qemu
以上是通过libvirt进行使用的，这样屏蔽了很多底层的细节，如果是直接使用qemu命令需要如下操作：

创建macvtap设备：

```
ip link add link eth0 name macvtap0 type macvtap mode bridge
ip link set macvtap0 address 1a:46:0b:ca:bc:7b up
bash-4.2# cat /sys/class/net/macvtap0/ifindex  # 对应下面命令的/dev/tap2
2
bash-4.2# cat /sys/class/net/macvtap0/address # 与qemu mac地址配置一致
1a:46:0b:ca:bc:7b
```

启动qemu,然后虚拟机里面的地址配置同libvirt，可以通过vnc客户端（vnc viewer）进入虚拟机配置，不在赘述:

```
bash-4.2# qemu-system-x86_64 -enable-kvm /root/CentOS-7-x86_64-GenericCloud.qcow2\
-netdev tap,fd=30,id=hostnet0,vhost=on,vhostfd=4 30<>/dev/tap2 4<>/dev/vhost-net \
-device virtio-net-pci,netdev=hostnet0,id=net0,mac=1a:46:0b:ca:bc:7b   \
-monitor telnet:127.0.0.1:5801,server,nowait
VNC server running on ::1:5900
```

## cloud-init介绍
上文提到，通过macvtap技术配置虚拟机网卡地址是需要进入虚拟机配置的, 然而我们实现一个虚拟机管理系统时显然不会手动进入去配置，这就需要cloud-init了

它可以帮助我们在虚拟机启动时配置虚拟机，如配置密码，配置网络，执行命令和写一些文件等。
先创建一个user-data文件，里面内容如下：

```
#cloud-config
write_files:
 - content: |
    DEVICE=eth0
    ONBOOT=yes
    TYPE=Ethernet
    USERCTL=no
    IPADDR=172.17.0.2
    NETMASK=255.255.0.0
    GATEWAY=172.17.0.1
    BOOTPROTO=static
    DNS1=172.17.0.1
    ONBOOT=yes
   path: /etc/sysconfig/network-scripts/ifcfg-eth0
runcmd:
 - systemctl start network
groups:
  - centos: [root]
  - cloud-users
ssh_pwauth: yes
chpasswd:
    expire: false
    list: |
        user1:222222
        root:333333
```
创建cloud-init镜像文件

```
yum install -y cloud-utils
cloud-localds my-seed.img user-data
```
libvirt中使用该镜像

```
  <disk type='file' device='disk'>
       <driver name='qemu' type='raw'/>
       <source file='/root/my-seed.img'/>
       <target dev='vdb' bus='virtio'/>
  </disk>
```
为了防止cloud-init走网络获取metadata，因为网卡没设置好所以会卡住五分钟，我们直接把网络获取metadata禁止掉：

vi /etc/cloud/cloud.cfg.d/05_logging.cfg 

加上：

```
network:
  config: disabled
```
然后启动虚拟机即可


## 常见问题

> Inappropriate ioctl for device

```
qemu-system-x86_64: -net tap,fd=5: TUNGETIFF ioctl() failed: Inappropriate ioctl for device
TUNSETOFFLOAD ioctl() failed: Inappropriate ioctl for device
```
因为容器没有挂载/dev目录

> KVM bios被禁

```
[root@helix105 ~]# docker run busybox uname -a
Could not access KVM kernel module: No such file or directory
qemu-lite-system-x86_64: failed to initialize KVM: No such file or directory

/usr/bin/docker-current: Error response from daemon: oci runtime error: Unable to launch /usr/bin/qemu-lite-system-x86_64: exit status 1.
ERRO[0001] error getting events from daemon: net/http: request canceled 
[root@helix105 ~]# lsmod |grep kvm
kvm                   598016  0 
irqbypass              16384  1 kvm
[root@helix105 ~]# modprobe kvm-intel
modprobe: ERROR: could not insert 'kvm_intel': Operation not supported
You have mail in /var/spool/mail/root
[root@helix105 ~]# dmesg |grep kvm
[    8.239309] kvm: disabled by bios
```
这个要进bios打开

> KVM: Permission denied

```
bash-4.2# virsh start vm_name1
error: Failed to start domain vm_name1
error: internal error: qemu unexpectedly closed the monitor: Could not access KVM kernel module: Permission denied
2019-06-20T07:26:33.304320Z qemu-system-x86_64: failed to initialize KVM: Permission denied
```
解决办法：
```
#chown root:kvm /dev/kvm
修改/etc/libvirt/qemu.conf，
#user="root"
user="root"
#group="root"
group="root"
重启服务
#service libvirtd restart，问题解决了
```

探讨可加QQ群：98488045

