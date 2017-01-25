var sps = require('./style-properties');
var styleProperty = sps.styleProperty;
var cssProperty = sps.cssProperty;

exports.translatePosition = translatePosition;
exports.translateTransform2D = translateTransform2D;
exports.translateTransform3D = translateTransform3D;
exports.translatePositionCSS = translatePositionCSS;
exports.translateTransform2DCSS = translateTransform2DCSS;
exports.translateTransform3DCSS = translateTransform3DCSS;
var transformCSSProp = cssProperty('transform');
var transformStyleProp = styleProperty('transform');
var supports3D = exports.supports3D = !!styleProperty('perspectiveOrigin');
var supports2D = exports.supports2D = !!transformStyleProp;

function translatePosition(el, x, y) {
  el.style.left = x + 'px';
  el.style.top = y + 'px';
}

function translateTransform2D(el, x, y) {
  el.style[transformStyleProp] = matrix2D(x, y);
}

function translateTransform3D(el, x, y) {
  el.style[transformStyleProp] = matrix3D(x, y);
}

function translatePositionCSS(x, y) {
  return 'left:' + x + 'px;top:' + y + 'px;';
}

function translateTransform2DCSS(x, y) {
  return transformCSSProp + ':' + matrix2D(x, y) + ';';
}

function translateTransform3DCSS(x, y) {
  return transformCSSProp + ':' + matrix3D(x, y) + ';';
}

function matrix2D(x, y) {
  return 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')';
}

function matrix3D(x, y) {
  return 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)';
}

var translate = exports.translate = supports3D ? translateTransform3D : supports2D ? translateTransform2D : translatePosition;

var translateCSS = exports.translateCSS = supports3D ? translateTransform3DCSS : supports2D ? translateTransform2DCSS : translatePositionCSS;
