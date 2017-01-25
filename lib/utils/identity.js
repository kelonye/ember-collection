var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function identity(item) {
  var key = void 0;
  var type = typeof item === 'undefined' ? 'undefined' : _typeof(item);

  if (type === 'string' || type === 'number') {
    key = item;
  } else {
    key = Ember.guidFor(item);
  }

  return key;
}

module.exports = identity;
