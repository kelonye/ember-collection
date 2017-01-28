var translate = require('./translate');
var translateCSS = translate.translateCSS;

exports.formatPixelStyle =  function x(pos, width, height) {
  var css = 'position:absolute;top:0;left:0;';
  css += translateCSS(pos.x, pos.y);
  if (typeof width !== 'string') width += 'px';
  css += 'width:' + width + ';height:' + height + 'px;';
  return css;
};

exports.formatPercentageStyle = function x(pos, width, height) {
  var css = 'position:absolute;top:0;left:0;';
  css += translateCSS(pos.x, pos.y);
  css += 'width:' + width + '%;height:' + height + 'px;';
  return css;
};
