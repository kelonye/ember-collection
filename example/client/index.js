var EmberCollection = require('ember-collection');

Em.TEMPLATES.index = Em.HTMLBars.template(require('./template'));

App = Em.Application.create();

App.IndexRoute = Em.Route.extend({
  model: function() {
    var items = [];
    for (var i = 0; i < 10000; i++) {
      items.push({name: "Item " + i});
    }
    return items;
  }
});

EmberCollection(App);
