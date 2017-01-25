var translate = require('./translate');
var translateCSS = translate.translateCSS;

exports.formatPixelStyle = function (pos, width, height) {
  let css = 'position:absolute;top:0;left:0;';
  css += translateCSS(pos.x, pos.y);
  css += 'width:' + width + 'px;height:' + height + 'px;';
  return css;
}

exports.formatPercentageStyle = function(pos, width, height) {
  let css = 'position:absolute;top:0;left:0;';
  css += translateCSS(pos.x, pos.y);
  css += 'width:' + width + '%;height:' + height + 'px;';
  return css;
}
