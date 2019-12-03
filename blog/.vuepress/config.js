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
  plugins: ['autobar'],
  themeConfig: {
    sidebarDepth: 2,
    displayAllHeaders: true,
    sidebar: [
      {
        title: 'Group 1',   // required
        path: '/foo/',      // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/'
        ]
      },
    ]
  }
}
