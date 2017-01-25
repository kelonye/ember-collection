var ShelfFirst = require('../layout-bin-packer/shelf-first');
var formatPercentageStyle = require('../utils/style-generators').formatPercentageStyle;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MixedGrid = function () {
  // How this layout works is by creating a fake grid that is 100px wide.
  // Each item's width is set to be the size of the column. The ShelfFirst lays out everything according to this fake grid.
  // When ember-collection asks for the style in formatItemStyle we pull the percent property to use as the width.
  function MixedGrid(itemCount, columns, height) {
    _classCallCheck(this, MixedGrid);

    var total = columns.reduce(function (a, b) {
      return a + b;
    });
    // Assert that the columns add up to 100. We don't want to infoce that they are EXACTLY 100 in case the user wants to use percentages.
    // for example [33.333, 66.666]
    Ember.assert('All columns must total 100 ' + total, total > 99 && total <= 100);
    var positions = [];
    var ci = 0;
    for (var i = 0; i < itemCount; i++) {
      positions.push({
        width: columns[ci],
        height: height,
        percent: columns[ci]
      });

      ci++;

      if (ci >= columns.length) {
        ci = 0;
      }
    }
    this.positions = positions;
    this.bin = new ShelfFirst(positions, 100);
  }

  _createClass(MixedGrid, [{
    key: 'contentSize',
    value: function contentSize(clientWidth /*, clientHeight*/) {
      var size = {
        width: clientWidth,
        height: this.bin.height(100)
      };
      return size;
    }
  }, {
    key: 'indexAt',
    value: function indexAt(offsetX, offsetY, width, height) {
      return this.bin.visibleStartingIndex(offsetY, 100, height);
    }
  }, {
    key: 'positionAt',
    value: function positionAt(index, width, height) {
      return this.bin.position(index, 100, height);
    }
  }, {
    key: 'widthAt',
    value: function widthAt(index) {
      return this.bin.widthAtIndex(index);
    }
  }, {
    key: 'heightAt',
    value: function heightAt(index) {
      return this.bin.heightAtIndex(index);
    }
  }, {
    key: 'count',
    value: function count(offsetX, offsetY, width, height) {
      return this.bin.numberVisibleWithin(offsetY, 100, height, true);
    }
  }, {
    key: 'formatItemStyle',
    value: function formatItemStyle(itemIndex, clientWidth, clientHeight) {
      var pos = this.positionAt(itemIndex, 100, clientHeight);
      var width = this.positions[itemIndex].percent;
      var height = this.heightAt(itemIndex, 100, clientHeight);
      var x = Math.floor(pos.x / 100 * clientWidth);
      return formatPercentageStyle({ x: x, y: pos.y }, width, height);
    }
  }]);

  return MixedGrid;
}();

module.exports = MixedGrid;
