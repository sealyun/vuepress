(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{234:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"kubernetes-admission-controller原理介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes-admission-controller原理介绍"}},[t._v("#")]),t._v(" kubernetes Admission Controller原理介绍")]),t._v(" "),s("blockquote",[s("p",[t._v("Admission Controller介绍")])]),t._v(" "),s("p",[t._v("Apiserver干的最重要的三个事就是：")]),t._v(" "),s("ol",[s("li",[t._v("认证 : 看是否是合法用户")]),t._v(" "),s("li",[t._v("授权 : 看用户具备哪些权限")]),t._v(" "),s("li",[t._v("admission controller : 一个调用链，对请求进行控制或修改，比如是否允许这个请求。")])]),t._v(" "),s("p",[t._v("admission controller非常有用，也是经常会用到的k8s的一个扩展方式，今天在源码级别对其做一下介绍，以及如何自己去开发一个admission controller.")]),t._v(" "),s("p",[t._v("我们的应用场景是：我们希望把所有需要创建的pod都加上一个注解，因为我们早期是通过podpreset给pod注入lxcfs的配置的，但是用户在写yaml文件时很容易忘记加上，所以需要在apiserver上来个自动处理\n")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('metadata:\n  name: test-net\n  annotations:\n    initializer.kubernetes.io/lxcfs: "true"   # 就是在pod的metadata里加上这个配置\n')])])]),s("h2",{attrs:{id:"默认admission-controller"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#默认admission-controller"}},[t._v("#")]),t._v(" 默认admission controller")]),t._v(" "),s("p",[t._v("已经有很多默认非常有用的admission插件，这里挑几个介绍一下：")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("作用")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("AlwaysPullImages")]),t._v(" "),s("td",[t._v("把所有镜像策略都调整成alwaysPull, 多租户安全时比较有用")])]),t._v(" "),s("tr",[s("td",[t._v("DefaultStorageClass")]),t._v(" "),s("td",[t._v("默认存储类型")])]),t._v(" "),s("tr",[s("td",[t._v("DefaultTolerationSeconds")]),t._v(" "),s("td",[t._v("节点notready:NoExecute时的容忍时间，比如有时我们升级kubelet，希望升级时pod不要漂移就会用到")])]),t._v(" "),s("tr",[s("td",[t._v("DenyEscalatingExec")]),t._v(" "),s("td",[t._v("拒绝远程连接容器")])]),t._v(" "),s("tr",[s("td",[t._v("ExtendedResourceToleration")]),t._v(" "),s("td",[t._v("比如我有扩展资源，那么我可以通过它来玷污节点，防止不需要该资源的pod到我的机器上来，如GPU")])]),t._v(" "),s("tr",[s("td",[t._v("LimitRanger")]),t._v(" "),s("td",[t._v("在多租户配额时相当有用，如果pod没配额，那么我可以默认给个很低的配额")])]),t._v(" "),s("tr",[s("td",[t._v("NamespaceAutoProvision")]),t._v(" "),s("td",[t._v("这个也非常有用，资源的namespace不存在时就创建一个")])]),t._v(" "),s("tr",[s("td",[t._v("PodPreset")]),t._v(" "),s("td",[t._v("可以对pod进行一些预处理设置")])]),t._v(" "),s("tr",[s("td",[t._v("ResourceQuota")]),t._v(" "),s("td",[t._v("多租户配额时比较重要，看资源是否满足resource quota中的配置")])])])]),t._v(" "),s("h2",{attrs:{id:"alwayspullimages-介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#alwayspullimages-介绍"}},[t._v("#")]),t._v(" alwaysPullImages 介绍")]),t._v(" "),s("p",[t._v("多租户时经常会开启这个，强制所有的镜像必须去拉取，因为如果不这样，那么别的租户如果知道了你的镜像名就可以写一个yaml去启动你的镜像，强制拉时犹豫需要image pull secret所以无法拉取你的镜像。")]),t._v(" "),s("p",[t._v("所以这个admission干的事就是把镜像拉取策略都改成alwaysPull：")]),t._v(" "),s("p",[t._v("代码位置：")]),t._v(" "),s("div",{staticClass:"language-golang extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('kubernetes/plugin/pkg/admission/alwayspullimages/admission.go\n\nfunc (a *AlwaysPullImages) Admit(attributes admission.Attributes, o admission.ObjectInterfaces) (err error) {\n    // 你可以在attibutes里获取到对象的一切信息，用户信息等\n\tif shouldIgnore(attributes) { // 检查一下是不是你关注的object, 比如创建的一个configmap 那么显然可以忽视\n\t\treturn nil\n\t}\n\tpod, ok := attributes.GetObject().(*api.Pod)\n\n    // 这里把initContainer和Container的拉取策略都给改了\n\tfor i := range pod.Spec.InitContainers {\n\t\tpod.Spec.InitContainers[i].ImagePullPolicy = api.PullAlways\n\t}\n\n\tfor i := range pod.Spec.Containers {\n\t\tpod.Spec.Containers[i].ImagePullPolicy = api.PullAlways\n\t}\n\n\treturn nil\n}\n\n# 还提供一个校验接口，看是不是真的都已经被改了\nfunc (a *AlwaysPullImages) Validate(attributes admission.Attributes, o admission.ObjectInterfaces) (err error) {\n\tpod, ok := attributes.GetObject().(*api.Pod)\n\tfor i := range pod.Spec.InitContainers {\n\t\tif pod.Spec.InitContainers[i].ImagePullPolicy != api.PullAlways {\n\t\t\treturn admission.NewForbidden(attributes,\n\t\t\t\tfield.NotSupported(field.NewPath("spec", "initContainers").Index(i).Child("imagePullPolicy"),\n\t\t\t\t\tpod.Spec.InitContainers[i].ImagePullPolicy, []string{string(api.PullAlways)},\n\t\t\t\t),\n\t\t\t)\n\t\t}\n\t}\n\n    ...\n\n\treturn nil\n}\n')])])]),s("p",[t._v("然后实现一个注册函数：")]),t._v(" "),s("div",{staticClass:"language-golang extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("func Register(plugins *admission.Plugins) {\n\tplugins.Register(PluginName, func(config io.Reader) (admission.Interface, error) {\n\t\treturn NewAlwaysPullImages(), nil\n\t})\n}\n\ntype AlwaysPullImages struct {\n\t*admission.Handler\n}\n")])])]),s("p",[t._v("最后需要在plugin里面把其注册进去：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("kubernetes/pkg/kubeapiserver/options/plugins.go\n\nfunc RegisterAllAdmissionPlugins(plugins *admission.Plugins) {\n\timagepolicy.Register(plugins)\n    ...\n}\n")])])]),s("p",[t._v("所以实现一个admission非常简单，主要就是实现两个接口即可。")]),t._v(" "),s("h2",{attrs:{id:"admission-control-webhooks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#admission-control-webhooks"}},[t._v("#")]),t._v(" admission control webhooks")]),t._v(" "),s("p",[t._v("很多情况下我们并不希望大动干戈去改apiserver代码，所以apiserver提供了一种动态扩展admission的方式，非常推荐。")]),t._v(" "),s("p",[t._v("有两种类型：")]),t._v(" "),s("ol",[s("li",[t._v("validating admission Webhook  只作校验，比如检测到某个特殊字段就不让请求通过")]),t._v(" "),s("li",[t._v("mutating admission webhook    可以对请求体进行修改（patch）")])]),t._v(" "),s("p",[t._v("比较重要的是这个AdmissionReview结构体，包含一个请求一个响应")]),t._v(" "),s("p",[t._v("请求：有Object的详细信息，用户信息\n响应: 最重要的是 1. 是否允许  2. 修改（patch）的类型  3. 修改（patch）的值， 这个符合json patch标准 （kubectl patch）")]),t._v(" "),s("p",[t._v("可"),s("a",{attrs:{href:"https://github.com/kubernetes/kubernetes/blob/v1.13.0/test/images/webhook/main.go",target:"_blank",rel:"noopener noreferrer"}},[t._v("在此"),s("OutboundLink")],1),t._v(" 找到一个webhook server的例子")]),t._v(" "),s("p",[t._v("看一个具体例子，labelpatch，是给对象的元数据里加一些label的。")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 特定的json patch格式")]),t._v("\n\taddFirstLabelPatch "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`[\n         { "op": "add", "path": "/metadata/labels", "value": {"added-label": "yes"}}\n     ]`')]),t._v("\n\taddAdditionalLabelPatch "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('`[\n         { "op": "add", "path": "/metadata/labels/added-label", "value": "yes" }\n     ]`')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// Add a label {"added-label": "yes"} to the object')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addLabel")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ar v1beta1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("AdmissionReview"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("v1beta1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("AdmissionResponse "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tobj "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tmetav1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ObjectMeta\n\t\tData "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\traw "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" ar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Object"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Raw\n\terr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" json"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Unmarshal")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("raw"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("obj"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tklog"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("toAdmissionResponse")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\treviewResponse "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" v1beta1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("AdmissionResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\treviewResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Allowed "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("len")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ObjectMeta"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Labels"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\treviewResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Patch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("byte")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("addFirstLabelPatch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这里最需要注意的就是修改时是通过patch的方式")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\treviewResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Patch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("byte")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("addAdditionalLabelPatch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\tpt "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" v1beta1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("PatchTypeJSONPatch\n\treviewResponse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("PatchType "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("pt\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("reviewResponse\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("把这个放到http handle里。")]),t._v(" "),s("p",[t._v("把这个HTTPS服务起一个service, 这样apiserver就可以自动发现它。")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('apiVersion: admissionregistration.k8s.io/v1beta1\nkind: ValidatingWebhookConfiguration\nmetadata:\n  name: <name of this configuration object>\nwebhooks:\n- name: <webhook name, e.g., pod-policy.example.io>\n  rules:                                            # 最好明确一下该hook关心哪些api，防止带来不必要的额外开销。\n  - apiGroups:\n    - ""\n    apiVersions:\n    - v1\n    operations:\n    - CREATE\n    resources:\n    - pods\n    scope: "Namespaced"\n  clientConfig:\n    service:\n      namespace: <namespace of the front-end service>  # webhook server的namespace\n      name: <name of the front-end service>            # service name\n    caBundle: <pem encoded ca cert that signs the server cert used by the webhook> # 因为需要通过https访问，所以要给apiserver配置ca\n  admissionReviewVersions:\n  - v1beta1\n  timeoutSeconds: 1\n')])])]),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("p",[t._v("adminssion control 是非常重要的APIserver扩展的方式，掌握了其开发很多地方就能以比较优雅的方式解决一些实际问题。是基于k8s开发PaaS平台的利器")]),t._v(" "),s("p",[t._v("探讨可加QQ群：98488045")])])}),[],!1,null,null,null);a.default=e.exports}}]);