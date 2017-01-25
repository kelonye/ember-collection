var camelize = Ember.String.camelize;
var capitalize = Ember.String.capitalize;
var stylePrefixes = ['Webkit', 'ms', 'Moz', 'O'];
var cssPrefixes = ['-webkit-', '-ms-', '-moz-', '-o-'];
var style = typeof document !== 'undefined' && document.documentElement && document.documentElement.style;

function findProperty(property, css) {
  var prop = css ? camelize(property) : property;
  if (prop in style) {
    return property;
  }
  var capitalized = capitalize(prop);
  for (var i = 0; i < stylePrefixes.length; i++) {
    var prefixed = stylePrefixes[i] + capitalized;
    if (prefixed in style) {
      return css ? cssPrefixes[i] + property : prefixed;
    }
  }
}

exports.styleProperty = function(prop) {
  return findProperty(prop, false);
}

exports.cssProperty = function(cssProp) {
  return findProperty(cssProp, true);
}
