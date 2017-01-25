require('ember');

var Grid = require('./layouts/grid');
var MixedGrid = require('./layouts/mixed-grid');
var PercentageColumns = require('./layouts/percentage-columns');
var EmberCollection = require('./ember-collection');
var EmberNativeScrollable = require('./ember-native-scrollable');

module.exports = function(app){

  app.EmberCollectionComponent = EmberCollection;
  app.EmberNativeScrollableComponent = EmberNativeScrollable;

  App.FixedGridLayoutHelper = Ember.Helper.helper(function(params, hash) {
    return new Grid(params[0], params[1]);
  });

  App.MixedGridLayoutHelper = Ember.Helper.helper(function(params, hash) {
    return new MixedGrid(params[0]);
  });

  App.PercentageColumnsLayoutHelper = Ember.Helper.helper(function (params, hash) {
    return new PercentageColumns(params[0], params[1], params[2]);
  });

}
