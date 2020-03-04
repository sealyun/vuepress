(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{240:function(a,e,t){"use strict";t.r(e);var n=t(0),s=Object(n.a)({},(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"kustomize-颤抖吧helm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kustomize-颤抖吧helm"}},[a._v("#")]),a._v(" kustomize 颤抖吧helm!")]),a._v(" "),t("p",[a._v("本人是helm的重度用户，但是吧越用越不爽。。。 helm v2版本三大弊病：")]),a._v(" "),t("ul",[t("li",[a._v("多租户支持不了")]),a._v(" "),t("li",[a._v("搞个tiller服务端，鸡肋")]),a._v(" "),t("li",[a._v("扯出自己很多概念")])]),a._v(" "),t("p",[a._v("v3版本抛弃tiller算是个进步，但是听说要上撸啊（lua）我就瞬间崩溃了，我只是想渲染个yaml文件而已。好在好多chart包貌似生态很繁荣。。。")]),a._v(" "),t("p",[a._v("今天给大家介绍kustomize是如何让helm寝食难安，做梦都在颤抖的.")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://sealyun.com/img/kustomize.jpeg",alt:""}})]),a._v(" "),t("h1",{attrs:{id:"安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[a._v("#")]),a._v(" 安装")]),a._v(" "),t("p",[a._v("kustomize已经集成在高版本(1.14+)的kubectl里了，可以使用 "),t("code",[a._v("kubectl apply -k [目录]")]),a._v(" 来执行")]),a._v(" "),t("p",[a._v("安装太低级不说了，装不上的智商估计就不用往下继续看了。。。")]),a._v(" "),t("h1",{attrs:{id:"快速开始"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#快速开始"}},[a._v("#")]),a._v(" 快速开始")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('mkdir ~/hello\nDEMO_HOME=~/hello\n\nBASE=$DEMO_HOME/base\nmkdir -p $BASE\n\ncurl -s -o "$BASE/#1.yaml" "https://raw.githubusercontent.com\\\n/kubernetes-sigs/kustomize\\\n/master/examples/helloWorld\\\n/{configMap,deployment,kustomization,service}.yaml"\n')])])]),t("p",[a._v("看下目录结构：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("base\n    ├── configMap.yaml\n    ├── deployment.yaml\n    ├── kustomization.yaml\n    └── service.yaml\n")])])]),t("p",[a._v("configmap deployment service里就是我们普通的yaml文件，再加个kustomizeation文件：")]),a._v(" "),t("p",[a._v("文件中指定了一些配置，指定我们把哪些个文件进行合并")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("➜  hello cat base/kustomization.yaml \n# Example configuration for the webserver\n# at https://github.com/monopole/hello\ncommonLabels:\n  app: hello\n\nresources:\n- deployment.yaml\n- service.yaml\n- configMap.yaml\n")])])]),t("p",[a._v("build一下就会输出整个yaml了：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('# kustomize build base\napiVersion: v1\ndata:\n  altGreeting: Good Morning!\n  enableRisky: "false"\nkind: ConfigMap\nmetadata:\n  labels:\n    app: hello\n  name: the-map\n---\napiVersion: v1\nkind: Service\nmetadata:\n  labels:\n    app: hello\n  name: the-service\n...\n')])])]),t("p",[a._v("很简单吧，是不是发现没什么卵用，咱再继续")]),a._v(" "),t("h2",{attrs:{id:"预上线配置与生产配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#预上线配置与生产配置"}},[a._v("#")]),a._v(" 预上线配置与生产配置")]),a._v(" "),t("p",[a._v("我们经常会遇到如开发环境与生产环境的配置文件不一样的情况，典型的配额与副本数不一样。 我们现在就来处理这种场景，staging环境与production环境。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("OVERLAYS=$DEMO_HOME/overlays\nmkdir -p $OVERLAYS/staging\nmkdir -p $OVERLAYS/production\n")])])]),t("p",[a._v("如两个环境的configmap不一样的场景")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("cat <<'EOF' >$OVERLAYS/staging/kustomization.yaml\nnamePrefix: staging-\ncommonLabels:\n  variant: staging\n  org: acmeCorporation\ncommonAnnotations:\n  note: Hello, I am staging!\nresources:\n- ../../base\npatchesStrategicMerge: # 这里意思是我们要把base里的configmap用下面的configmap overlay一下\n- map.yaml\nEOF\n")])])]),t("p",[a._v("这样我们用下面的configmap去更新base中的，这里相当于增加了俩字段。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('cat <<EOF >$OVERLAYS/staging/map.yaml\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: the-map\ndata:\n  altGreeting: "Have a pineapple!"\n  enableRisky: "true"\nEOF\n')])])]),t("p",[a._v("再build一下观察configmap变化：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('➜  hello kustomize build overlays/staging \napiVersion: v1\ndata:\n  altGreeting: Have a pineapple!  # 覆盖了base中的data\n  enableRisky: "true"\nkind: ConfigMap\nmetadata:\n  annotations:\n    note: Hello, I am staging!  # 新增了配置文件中的commonAnnotations\n  labels:\n    app: hello                  # 继承了base中的label\n    org: acmeCorporation        # 新增了配置文件中的label\n    variant: staging\n  name: staging-the-map\n')])])]),t("p",[a._v("production同理不再赘述了， 然后就可以部署到k8s集群中：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("kustomize build $OVERLAYS/staging |\\\n    kubectl apply -f -\n")])])]),t("p",[a._v("或者")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("kubectl apply -k $OVERLAYS/staging\n")])])]),t("h1",{attrs:{id:"设置字段，如镜像tag"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置字段，如镜像tag"}},[a._v("#")]),a._v(" 设置字段，如镜像tag")]),a._v(" "),t("p",[a._v("我们yaml文件中镜像有tag，每次版本更新都去修改文件比较麻烦。特别是在CI/CD时有可能取的是类似 DRONE_TAG的环境变量用作镜像tag。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("cd base\nkustomize edit set image monopole/hello=alpine:3.6\n")])])]),t("p",[a._v("kustomization.yaml中就可以看到：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('images:\n- name: monopole/hello\n  newName: alpine\n  newTag: "3.6"\n')])])]),t("p",[a._v("再build时deployment中镜像就变了：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  labels:\n    app: hello\n  name: the-deployment\nspec:\n...\n        image: alpine:3.6\n")])])]),t("p",[a._v("这样在CI/CD时以DRONE为例就可以直接这样：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("deploy:\n   image: kustomize:latest\n   commands:\n     - kustomize edit set image monopole/hello=alpine:{DRONE_TAG=latest}\n     - kubectl apply -k .\n")])])]),t("p",[a._v("这样你代码的tag与构建镜像的tag以及yaml文件中的tag就完美保持一致了，再也不用担心上错版本了。")]),a._v(" "),t("h1",{attrs:{id:"注入k8s运行时数据"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#注入k8s运行时数据"}},[a._v("#")]),a._v(" 注入k8s运行时数据")]),a._v(" "),t("p",[a._v("kustomize有个很强大的特性就是允许注入k8s运行时的一些数据，举个栗子：")]),a._v(" "),t("p",[a._v("假设部署个php要去连mysql，但是只知道mysql的Servicename 并不知道端口号是啥，那么kubemize就可以帮你解决这个问题：")]),a._v(" "),t("p",[a._v("这里给个获取metadata.name的例子，其它运行时数据一个理")]),a._v(" "),t("p",[a._v("php的yaml文件可以这样写：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('apiVersion: apps/v1beta2\nkind: Deployment\nmetadata:\n  name: wordpress\nspec:\n  template:\n    spec:\n      initContainers:\n      - name: init-command\n        image: debian\n        command:\n        - "echo $(WORDPRESS_SERVICE)"\n        - "echo $(MYSQL_SERVICE)"\n      containers:\n      - name: wordpress\n        env:\n        - name: WORDPRESS_DB_HOST\n          value: $(MYSQL_SERVICE)\n        - name: WORDPRESS_DB_PASSWORD\n          valueFrom:\n            secretKeyRef:\n              name: mysql-pass\n              key: password\n')])])]),t("p",[a._v("然后配置下kusztomize：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("cat <<EOF >>$DEMO_HOME/kustomization.yaml\nvars:\n  - name: WORDPRESS_SERVICE  # 最终被渲染进yaml\n    objref:\n      kind: Service\n      name: wordpress        # 获取叫wordpress的Service\n      apiVersion: v1\n    fieldref:\n      fieldpath: metadata.name # 最终获取service中的metadata.name作为WORDPRESS_SERVICE \n  - name: MYSQL_SERVICE\n    objref:\n      kind: Service\n      name: mysql\n      apiVersion: v1\nEOF\n")])])]),t("p",[a._v("这是个十分强大的特性，比如有时我们觉得DNS不够稳定或者短链接多不想走DNS服务发现，A访问B时想直接用B的clusterip，但是B部署之前又不知道IP是啥，就可以")]),a._v(" "),t("p",[a._v("通过这种方式获取到clusterip，理解了这个原理就可以随意发挥了.")]),a._v(" "),t("h1",{attrs:{id:"json-patch"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#json-patch"}},[a._v("#")]),a._v(" json patch")]),a._v(" "),t("p",[a._v("同样可以通过指定json patch对yaml进行修改, yaml和json格式都支持：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("cat <<EOF >$DEMO_HOME/ingress_patch.yaml\n- op: replace\n  path: /spec/rules/0/host  # 修改ingress中的host\n  value: foo.bar.io\n\n- op: add\n  path: /spec/rules/0/http/paths/-  # 增加path\n  value:\n    path: '/test'\n    backend:\n      serviceName: my-test\n      servicePort: 8081\nEOF\n")])])]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("cat <<EOF >>$DEMO_HOME/kustomization.yaml\npatchesJson6902:\n- target:\n    group: extensions\n    version: v1beta1\n    kind: Ingress\n    name: my-ingress\n  path: ingress_patch.yaml\nEOF\n")])])]),t("p",[a._v("还可以把一个patch打到多个对象上，比如我们给所有Deployment加探针啥的")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("cat <<EOF >>$DEMO_HOME/kustomization.yaml\npatches:\n- path: patch.yaml\n  target:\n    kind: Deployment\nEOF\n")])])]),t("h1",{attrs:{id:"总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),t("p",[a._v("个人是不太喜欢重的东西的，只是管理个yaml文件而已真的不用搞那么复杂。当初helm v2时想通过程序去调用时发现非常麻烦，还得找个swift项目中转，结果swift有些返回值非常之不友好，还需要自己去解析一波，还是挺痛苦的回忆。")]),a._v(" "),t("p",[a._v("我觉得简单yaml kustomize很够用,需要复杂精细的控制时helm也无可奈何还得靠operator发挥，这上下一挤压让helm处境就比较尴尬了。。。 kustomize还被集成到kubectl里了这样确实更方便了。")]),a._v(" "),t("p",[a._v("探讨可加QQ群：98488045")])])}),[],!1,null,null,null);e.default=s.exports}}]);