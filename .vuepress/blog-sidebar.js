module.exports = {
  '/blog/': [
    {
      title: '简介',
      collapsable: false,
      children: [
        ['/faq/','faq'],
      ]
    }, {
      title: '概',
      path: '/faq/',
      collapsable: false,
      children: [
        'quick-win',
        'why-kuboard',
        'concepts'
      ]
    }, 
  ],
  '/faq/': [
    {
      title: '简介',
      collapsable: false,
      children: [
        ['/faq/','faq'],
      ]
    }, {
      title: '概',
      path: '/faq/',
      collapsable: false,
      children: [
        'quick-win',
        'why-kuboard',
        'concepts'
      ]
    }, 
  ],
}
