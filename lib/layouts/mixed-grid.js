var ShelfFirst = require('../layout-bin-packer/shelf-first');
var formatPixelStyle = require('../utils/style-generators').formatPixelStyle;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MixedGrid = function () {
  function MixedGrid(content, width) {
    _classCallCheck(this, MixedGrid);

    this.content = content;
    this.bin = new ShelfFirst(content, width);
  }

  _createClass(MixedGrid, [{
    key: "contentSize",
    value: function contentSize(clientWidth /*, clientHeight*/) {
      return {
        width: clientWidth,
        height: this.bin.height(clientWidth)
      };
    }
  }, {
    key: "indexAt",
    value: function indexAt(offsetX, offsetY, width, height) {
      return this.bin.visibleStartingIndex(offsetY, width, height);
    }
  }, {
    key: "positionAt",
    value: function positionAt(index, width, height) {
      return this.bin.position(index, width, height);
    }
  }, {
    key: "widthAt",
    value: function widthAt(index) {
      return this.bin.widthAtIndex(index);
    }
  }, {
    key: "heightAt",
    value: function heightAt(index) {
      return this.bin.heightAtIndex(index);
    }
  }, {
    key: "count",
    value: function count(offsetX, offsetY, width, height) {
      return this.bin.numberVisibleWithin(offsetY, width, height, true);
    }
  }, {
    key: "formatItemStyle",
    value: function formatItemStyle(itemIndex, clientWidth, clientHeight) {
      var pos = this.positionAt(itemIndex, clientWidth, clientHeight);
      var width = this.widthAt(itemIndex, clientWidth, clientHeight);
      var height = this.heightAt(itemIndex, clientWidth, clientHeight);
      return formatPixelStyle(pos, width, height);
    }
  }]);

  return MixedGrid;
}();


module.exports = MixedGrid;
