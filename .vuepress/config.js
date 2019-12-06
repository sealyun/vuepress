const getConfig = require("vuepress-bar");
const barConfig = getConfig('./',["/blog/","/faq/","/docs/"],{navPrefix:"blog"})

module.exports = {
  head: [
    ['meta', { name: 'theme-color', content: '#007af5' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['script', {}, `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?2803648cc5852dd3e9e46bbd0bf63366";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  `]
  ],
  title: 'sealyun | kubernetes安装',
  plugins: [['seo',{siteTitle: (_,$site) => "sealyun 专注于kubernetes安装", title: $page => "sealyun kubernetes安装"}]],
  themeConfig: {
    logo: 'https://sealyun.com/img/logo.png',
    sidebar: barConfig.sidebar,
    nav: [
      { text: '使用文档', link: '/docs/', target:'_self', rel:'' },
      { text: '离线包下载', link: 'http://store.lameleg.com', target:'_self', rel:'' },
      { text: '常见问题', link: '/faq/', target:'_self', rel:'' },
      { text: '版本变更', link: '/changelog/', target:'_self', rel:'' },
      { text: '开源项目', link: '/github/', target:'_self' },
      { text: '联系方式', link: '/contact/', target:'_self' },
      {
        text: '友情连接',
        items: [
          { text: '', items: [{link: 'https://fuckcloudnative.io/#sealyun', text: "云原生实验室"}] },
          { text: '', items: [{link: 'https://kuboard.cn/#sealyun', text: "kuboard"}] },
          { text: '', items: [{link: 'https://www.qikqiak.com/?utm_source=sealyun.com', text: "阳明的博客"}] },
          { text: '', items: [{link: 'https://zhangguanzhang.github.io/#sealyun', text: "张馆长的博客"}] },
        ]
      },
    ]
  },
}
