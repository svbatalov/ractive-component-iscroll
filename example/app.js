var Ractive = require('ractive');
require('../index.js'); // require <Scroll>

var app = new Ractive({
  template: '#template',
  el: 'body',
  data: {
    scrollOpts: {
      interactiveScrollbars: true,
    },
    items: []
  }
});

setInterval(function () {
  var items = app.get('items')
  app.push('items', new Date ());
}, 500);
