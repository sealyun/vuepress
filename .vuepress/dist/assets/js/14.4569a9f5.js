(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{214:function(a,t,s){"use strict";s.r(t);var e=s(0),r=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"应用安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#应用安装"}},[a._v("#")]),a._v(" 应用安装")]),a._v(" "),s("h2",{attrs:{id:"安装app如dashboard-ingress"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装app如dashboard-ingress"}},[a._v("#")]),a._v(" 安装APP如dashboard ingress")]),a._v(" "),s("p",[a._v("我们把诸如dashboard,prometheus,ingress等等都称之为APP")]),a._v(" "),s("p",[a._v("所有APP都可使用类似 "),s("code",[a._v("sealos install --pkg-url dashboard.tar")]),a._v("的方式安装")]),a._v(" "),s("p",[a._v("为什么不直接kubectl apply? 因为我们把镜像与配置文件和一些脚本都放入tar包中来保障一致性，并可以在没有镜像仓库的情况下帮用户导入镜像")]),a._v(" "),s("p",[a._v("还有就是很多情况下不可避免的要在执行完yaml之后执行一些命令，如安装完dashboard获取token这些")]),a._v(" "),s("table",[s("thead",[s("tr",[s("th",[a._v("APP名")]),a._v(" "),s("th",[a._v("安装示例")])])]),a._v(" "),s("tbody",[s("tr",[s("td",[s("a",{attrs:{href:"https://github.com/sealstore/dashboard/tree/kuboard",target:"_blank",rel:"noopener noreferrer"}},[a._v("kuboard"),s("OutboundLink")],1)]),a._v(" "),s("td",[a._v("sealos install --pkg-url https://github.com/sealstore/dashboard/releases/download/v1.0-1/kuboard.tar")])]),a._v(" "),s("tr",[s("td",[s("a",{attrs:{href:"https://github.com/sealstore/dashboard/tree/dashboard",target:"_blank",rel:"noopener noreferrer"}},[a._v("dashboard"),s("OutboundLink")],1)]),a._v(" "),s("td",[a._v("sealos install --pkg-url https://github.com/sealstore/dashboard/releases/download/v2.0.0-bata5/dashboard.tar")])]),a._v(" "),s("tr",[s("td",[s("a",{attrs:{href:"https://github.com/sealstore/prometheus",target:"_blank",rel:"noopener noreferrer"}},[a._v("prometheus"),s("OutboundLink")],1)]),a._v(" "),s("td",[a._v("sealos install --pkg-url https://github.com/sealstore/prometheus/releases/download/v0.31.1/prometheus.tar")])]),a._v(" "),s("tr",[s("td",[s("a",{attrs:{href:"https://github.com/sealstore/ingress",target:"_blank",rel:"noopener noreferrer"}},[a._v("ingress"),s("OutboundLink")],1)]),a._v(" "),s("td",[a._v("sealos install --pkg-url https://github.com/sealstore/ingress/releases/download/v0.15.2/contour.tar")])])])]),a._v(" "),s("h2",{attrs:{id:"app离线包原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#app离线包原理"}},[a._v("#")]),a._v(" APP离线包原理")]),a._v(" "),s("div",{staticClass:"language-$xslt extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("tar cvf dashboard.tar config dashboard.tar.gz\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("dashboard.tar\n   dashboard.tar.gz # 包含所有镜像文件，yaml文件，配置文件脚本，具体是什么sealos不关心 \n   config           # sealos install 配置文件\n")])])]),s("p",[a._v("config 文件内容：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("# APPLY指令只会在能访问apiserver的节点执行一次\nAPPLY kubectl apply -k manifests\n# LOAD会在sealos过滤出来的每个节点上执行\nLOAD docker load -i images.tar\n# DELETE 命令只会在能访问apiserver节点执行一次\nDELETE kubectl delete -k manifests\n# 删除命令，sealos remove命令会调用\nREMOVE docker rmi dashboard:2.0.0\n")])])]),s("p",[a._v("指令说明：")]),a._v(" "),s("table",[s("thead",[s("tr",[s("th",[a._v("指令")]),a._v(" "),s("th",[a._v("作用")]),a._v(" "),s("th",[a._v("事例")]),a._v(" "),s("th",[a._v("在过滤出来的每个节点执行")]),a._v(" "),s("th",[a._v("只针对apiserver执行一次")])])]),a._v(" "),s("tbody",[s("tr",[s("td",[a._v("LOAD")]),a._v(" "),s("td",[a._v("如导入镜像")]),a._v(" "),s("td",[a._v("docker load -i images.tar")]),a._v(" "),s("td",[a._v("✓")]),a._v(" "),s("td",[a._v("x")])]),a._v(" "),s("tr",[s("td",[a._v("START")]),a._v(" "),s("td",[a._v("如启动docker")]),a._v(" "),s("td",[a._v("systemctl start docker")]),a._v(" "),s("td",[a._v("✓")]),a._v(" "),s("td",[a._v("x")])]),a._v(" "),s("tr",[s("td",[a._v("STOP")]),a._v(" "),s("td",[a._v("如停止docker")]),a._v(" "),s("td",[a._v("systemctl stop docker")]),a._v(" "),s("td",[a._v("✓")]),a._v(" "),s("td",[a._v("x")])]),a._v(" "),s("tr",[s("td",[a._v("REMOVE")]),a._v(" "),s("td",[a._v("如清理镜像")]),a._v(" "),s("td",[a._v("docker rmi -f ...")]),a._v(" "),s("td",[a._v("✓")]),a._v(" "),s("td",[a._v("x")])]),a._v(" "),s("tr",[s("td",[a._v("APPLY")]),a._v(" "),s("td",[a._v("如部署yaml文件")]),a._v(" "),s("td",[a._v("kubectl apply -k .")]),a._v(" "),s("td",[a._v("x")]),a._v(" "),s("td",[a._v("✓")])]),a._v(" "),s("tr",[s("td",[a._v("DELETE")]),a._v(" "),s("td",[a._v("如删除yaml")]),a._v(" "),s("td",[a._v("kubectl delete -f .")]),a._v(" "),s("td",[a._v("x")]),a._v(" "),s("td",[a._v("✓")])])])]),a._v(" "),s("h1",{attrs:{id:"安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[a._v("#")]),a._v(" 安装")]),a._v(" "),s("div",{staticClass:"language-$xslt extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('sealos install --pkg-url dashboard.tar --label role=master --cmd "APPLY kubectl apply -k manifests" --cmd "LOAD docker load -i images.tar"\n')])])]),s("ul",[s("li",[a._v("--pkg 支持本地与http")]),a._v(" "),s("li",[a._v("--label 过滤出k8s集群中指定节点")]),a._v(" "),s("li",[a._v("--cmd 会覆盖config中的指令")])]),a._v(" "),s("p",[a._v("或者使用kustomize替换包内镜像版本")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('sealos install --pkg-url prometheus.tar --cmd \\\n        "APPLY kustomize edit set image sealyun/fist:1.0=sealyun/fist:2.0 && kubectl apply -k manifests"\n')])])]),s("h2",{attrs:{id:"配置文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置文件"}},[a._v("#")]),a._v(" 配置文件")]),a._v(" "),s("p",[a._v("~/.sealos/config.yaml\nsealos init (3.0.1以上版本)时把相关参数存入配置文件, 供执行clean, install命令使用")]),a._v(" "),s("h2",{attrs:{id:"dashboard-包制作事例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dashboard-包制作事例"}},[a._v("#")]),a._v(" dashboard 包制作事例")]),a._v(" "),s("ol",[s("li",[a._v("创建工作目录")])]),a._v(" "),s("div",{staticClass:"language-cassandraql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("mkdir dashboard && cd dashboard\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[a._v("编辑配置文件")])]),a._v(" "),s("div",{staticClass:"language-cassandraql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('echo "LOAD docker load -i image.tar" >> config\necho "APPLY kubectl apply -f dashboard.yaml" >> config\necho "DELETE kubectl delete -f dashboard.yaml" >> config\necho "REMOVE sleep 10 && docker rmi -f dashboard:latest" >> config\n')])])]),s("ol",{attrs:{start:"3"}},[s("li",[a._v("下载yaml文件与保存镜像")])]),a._v(" "),s("div",{staticClass:"language-cassandraql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("wget https://..../dashboard.yaml \ndocker save -o image.tar dashboard:latest\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[a._v("打包")])]),a._v(" "),s("div",{staticClass:"language-cassandraql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("tar cvf dashboard.tar config dashboard.yaml image.tar\n")])])]),s("ol",{attrs:{start:"5"}},[s("li",[a._v("安装使用")])]),a._v(" "),s("div",{staticClass:"language-cassandraql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("sealos install --pkg-url ./dashboard.tar\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);