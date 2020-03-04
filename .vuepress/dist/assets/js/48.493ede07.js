(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{244:function(e,t,a){"use strict";a.r(t);var n=a(0),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"使用prometheus-operator监控envoy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用prometheus-operator监控envoy"}},[e._v("#")]),e._v(" 使用prometheus operator监控envoy")]),e._v(" "),a("h1",{attrs:{id:"概述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[e._v("#")]),e._v(" 概述")]),e._v(" "),a("p",[e._v("prometheus operator应当是使用监控系统的最佳实践了，首先它一键构建整个监控系统，通过一些无侵入的手段去配置如监控数据源等\n故障自动恢复，高可用的告警等。。")]),e._v(" "),a("p",[e._v("不过对于新手使用上还是有一丢丢小门槛，本文就结合如何给envoy做监控这个例子来分享使用prometheus operator的正确姿势")]),e._v(" "),a("p",[e._v("至于如何写告警规则，如何配置prometheus查询语句不是本文探讨的重点，会在后续文章中给大家分享，本文着重探讨如何使用prometheus operator\n")]),e._v(" "),a("h1",{attrs:{id:"prometheus-operator安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prometheus-operator安装"}},[e._v("#")]),e._v(" prometheus operator安装")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://sealyun.com/pro/products/",target:"_blank",rel:"noopener noreferrer"}},[e._v("sealyun离线安装包"),a("OutboundLink")],1),e._v("内已经包含prometheus operator,安装完直接使用即可")]),e._v(" "),a("h1",{attrs:{id:"配置监控数据源"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置监控数据源"}},[e._v("#")]),e._v(" 配置监控数据源")]),e._v(" "),a("p",[e._v("原理：通过operator的CRD发现监控数据源service\n"),a("img",{attrs:{src:"/prometheus/operator-arch.png",alt:""}})]),e._v(" "),a("h2",{attrs:{id:"启动envoy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动envoy"}},[e._v("#")]),e._v(" 启动envoy")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: envoy\n  labels:\n    app: envoy\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: envoy\n  template:\n    metadata:\n      labels:\n        app: envoy\n    spec:\n      volumes:\n      - hostPath:   # 为了配置方便把envory配置文件挂载出来了\n          path: /root/envoy\n          type: DirectoryOrCreate\n        name: envoy\n      containers:\n      - name: envoy\n        volumeMounts:\n        - mountPath: /etc/envoy\n          name: envoy\n          readOnly: true\n        image: envoyproxy/envoy:latest\n        ports:\n        - containerPort: 10000 # 数据端口\n        - containerPort: 9901  # 管理端口，metric是通过此端口暴露\n\n---\nkind: Service\napiVersion: v1\nmetadata:\n  name: envoy\n  labels:\n    app: envoy  # 给service贴上标签，operator会去找这个service\nspec:\n  selector:\n    app: envoy\n  ports:\n  - protocol: TCP\n    port: 80\n    targetPort: 10000\n    name: user\n  - protocol: TCP   # service暴露metric的端口\n    port: 81\n    targetPort: 9901\n    name: metrics   # 名字很重要，ServiceMonitor 会找端口名\n")])])]),a("p",[e._v("envoy配置文件：\n监听的地址一定需要修改成0.0.0.0，否则通过service获取不到metric\n/root/envoy/envoy.yaml")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('admin:\n  access_log_path: /tmp/admin_access.log\n  address:\n    socket_address:\n      protocol: TCP\n      address: 0.0.0.0   # 这里一定要改成0.0.0.0，而不能是127.0.0.1\n      port_value: 9901\nstatic_resources:\n  listeners:\n  - name: listener_0\n    address:\n      socket_address:\n        protocol: TCP\n        address: 0.0.0.0\n        port_value: 10000\n    filter_chains:\n    - filters:\n      - name: envoy.http_connection_manager\n        config:\n          stat_prefix: ingress_http\n          route_config:\n            name: local_route\n            virtual_hosts:\n            - name: local_service\n              domains: ["*"]\n              routes:\n              - match:\n                  prefix: "/"\n                route:\n                  host_rewrite: sealyun.com\n                  cluster: service_google\n          http_filters:\n          - name: envoy.router\n  clusters:\n  - name: service_sealyun\n    connect_timeout: 0.25s\n    type: LOGICAL_DNS\n    # Comment out the following line to test on v6 networks\n    dns_lookup_family: V4_ONLY\n    lb_policy: ROUND_ROBIN\n    hosts:\n      - socket_address:\n          address: sealyun.com\n          port_value: 443\n    tls_context: { sni: sealyun.com }\n')])])]),a("h2",{attrs:{id:"使用servicemonitor"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用servicemonitor"}},[e._v("#")]),e._v(" 使用ServiceMonitor")]),e._v(" "),a("p",[e._v("envoyServiceMonitor.yaml:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("apiVersion: monitoring.coreos.com/v1\nkind: ServiceMonitor\nmetadata:\n  labels:\n    app: envoy\n  name: envoy\n  namespace: monitoring  # 这个可以与service不在一个namespace中\nspec:\n  endpoints:\n  - interval: 15s\n    port: metrics        # envoy service的端口名\n    path: /stats/prometheus # 数据源path\n  namespaceSelector:\n    matchNames:        # envoy service所在namespace\n    - default\n  selector:\n    matchLabels:\n      app: envoy       # 选择envoy service\n")])])]),a("p",[e._v("create成功后我们就可以看到envoy的数据源了：\n"),a("img",{attrs:{src:"/prometheus/envoy-target.png",alt:""}})]),e._v(" "),a("p",[e._v("然后就可以看到metric了：\n"),a("img",{attrs:{src:"/prometheus/envoy-metric.png",alt:""}})]),e._v(" "),a("p",[e._v("然后就可以在grafana上进行一些配置了，promethues相关使用不是本文讨论的对象")]),e._v(" "),a("h1",{attrs:{id:"告警配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#告警配置"}},[e._v("#")]),e._v(" 告警配置")]),e._v(" "),a("h2",{attrs:{id:"alert-manager配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#alert-manager配置"}},[e._v("#")]),e._v(" alert manager配置")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("[root@dev-86-201 envoy]# kubectl get secret -n monitoring\nNAME                              TYPE                                  DATA   AGE\nalertmanager-main                 Opaque                                1      27d\n")])])]),a("p",[e._v("我们可以看到这个secrect，看下里面具体内容：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("[root@dev-86-201 envoy]# kubectl get secret  alertmanager-main -o yaml -n monitoring\napiVersion: v1\ndata:\n  alertmanager.yaml: Imdsb2JhbCI6IAogICJyZXNvbHZlX3RpbWVvdXQiOiAiNW0iCiJyZWNlaXZlcnMiOiAKLSAibmFtZSI6ICJudWxsIgoicm91dGUiOiAKICAiZ3JvdXBfYnkiOiAKICAtICJqb2IiCiAgImdyb3VwX2ludGVydmFsIjogIjVtIgogICJncm91cF93YWl0IjogIjMwcyIKICAicmVjZWl2ZXIiOiAibnVsbCIKICAicmVwZWF0X2ludGVydmFsIjogIjEyaCIKICAicm91dGVzIjogCiAgLSAibWF0Y2giOiAKICAgICAgImFsZXJ0bmFtZSI6ICJEZWFkTWFuc1N3aXRjaCIKICAgICJyZWNlaXZlciI6ICJudWxsIg==\nkind: Secret\n")])])]),a("p",[e._v("base64解码一下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('"global":\n  "resolve_timeout": "5m"\n"receivers":\n- "name": "null"\n"route":\n  "group_by":\n  - "job"\n  "group_interval": "5m"\n  "group_wait": "30s"\n  "receiver": "null"\n  "repeat_interval": "12h"\n  "routes":\n  - "match":\n      "alertname": "DeadMansSwitch"\n    "receiver": "null"\n')])])]),a("p",[e._v("所以配置alertmanager就非常简单了，就是创建一个secrect即可\n如alertmanager.yaml:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("global:\n  smtp_smarthost: 'smtp.qq.com:465'\n  smtp_from: '5153@qq.com'\n  smtp_auth_username: '5153@qq.com'\n  smtp_auth_password: 'xxx'       # 这个密码是开启smtp授权后生成的,下文有说怎么配置\n  smtp_require_tls: false\nroute:\n  group_by: ['alertmanager','cluster','service']\n  group_wait: 30s\n  group_interval: 5m\n  repeat_interval: 3h\n  receiver: 'fanux'\n  routes:\n  - receiver: 'fanux'\nreceivers:\n- name: 'fanux'\n  email_configs:\n  - to: '5153@qq.com'\n    send_resolved: true\n")])])]),a("p",[e._v("delete掉老的secret，根据自己的配置重新生成secret即可")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl delete secret alertmanager-main -n monitoring\nkubectl create secret generic alertmanager-main --from-file=alertmanager.yaml -n monitoring\n")])])]),a("h2",{attrs:{id:"邮箱配置，以qq邮箱为例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#邮箱配置，以qq邮箱为例"}},[e._v("#")]),e._v(" 邮箱配置，以QQ邮箱为例")]),e._v(" "),a("p",[e._v("开启smtp pop3服务\n"),a("img",{attrs:{src:"/prometheus/email-setting.png",alt:""}}),e._v(" "),a("img",{attrs:{src:"/prometheus/email-setting2.png",alt:""}}),e._v(" 照着操作即可，后面会弹框一个授权码，配置到上面的配置文件中\n然后就可以收到告警了：\n"),a("img",{attrs:{src:"/prometheus/alert-email.png",alt:""}})]),e._v(" "),a("h2",{attrs:{id:"告警规则配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#告警规则配置"}},[e._v("#")]),e._v(" 告警规则配置")]),e._v(" "),a("p",[e._v("prometheus operator自定义PrometheusRule crd去描述告警规则")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("[root@dev-86-202 shell]# kubectl get PrometheusRule -n monitoring\nNAME                   AGE\nprometheus-k8s-rules   6m\n")])])]),a("p",[e._v("直接edit这个rule即可，也可以再自己去创建个PrometheusRule")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl edit PrometheusRule prometheus-k8s-rules -n monitoring\n")])])]),a("p",[e._v("如我们在group里加一个告警：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("spec:\n  groups:\n  - name: ./example.rules\n    rules:\n    - alert: ExampleAlert\n      expr: vector(1)\n  - name: k8s.rules\n    rules:\n")])])]),a("p",[e._v("重启prometheuspod:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl delete pod prometheus-k8s-0 prometheus-k8s-1 -n monitoring\n")])])]),a("p",[e._v("然后在界面上就可以看到新加的规则：\n"),a("img",{attrs:{src:"prometheus/prometheus-rule.png",alt:""}})]),e._v(" "),a("p",[e._v("探讨可加QQ群：98488045")])])}),[],!1,null,null,null);t.default=r.exports}}]);