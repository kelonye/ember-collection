var translate = require('./utils/translate').translate;
var styleProperty = require('./utils/style-properties').styleProperty;
var overflowScrollingProp = styleProperty('overflowScrolling');

module.exports = Ember.Component.extend({
  init: function init() {
    this._clientWidth = 0;
    this._clientHeight = 0;
    this._scrollLeft = 0;
    this._scrollTop = 0;
    this._animationFrame = undefined;
    this._super();
  },
  didReceiveAttrs: function didReceiveAttrs() {
    this._contentSize = this.getAttr('content-size');
    this._scrollLeft = this.getAttr('scroll-left');
    this._scrollTop = this.getAttr('scroll-top');
  },
  didInsertElement: function didInsertElement() {
    this.contentElement = this.element.firstElementChild;
    this.applyStyle();
    this.applyContentSize();
    this.syncScrollFromAttr();
    this.startScrollCheck();
  },
  didUpdate: function didUpdate() {
    this.applyContentSize();
    this.syncScrollFromAttr();
  },
  willDestroyElement: function willDestroyElement() {
    this.cancelScrollCheck();
    this.contentElement = undefined;
  },
  applyStyle: function applyStyle() {
    if (overflowScrollingProp) {
      this.element.style.overflow = 'scroll';
      this.element.style[overflowScrollingProp] = 'touch';
    } else {
      this.element.style.overflow = 'auto';
    }

    // hack to force render buffer so outside doesn't repaint on scroll
    translate(this.element, 0, 0);

    this.element.style.position = 'absolute';
    this.element.style.left = 0;
    this.element.style.top = 0;
    this.element.style.bottom = 0;
    this.element.style.right = 0;
  },
  applyContentSize: function applyContentSize() {
    this.contentElement.style.position = 'relative';
    this.contentElement.style.width = this._contentSize.width + 'px';
    this.contentElement.style.height = this._contentSize.height + 'px';
  },
  syncScrollFromAttr: function syncScrollFromAttr() {
    if (this._appliedScrollTop !== this._scrollTop) {
      this._appliedScrollTop = this._scrollTop;
      if (this._scrollTop >= 0) {
        this.element.scrollTop = this._scrollTop;
      }
    }
    if (this._appliedScrollLeft !== this._scrollLeft) {
      this._appliedScrollLeft = this._scrollLeft;
      if (this._scrollLeft >= 0) {
        this.element.scrollLeft = this._scrollLeft;
      }
    }
  },
  startScrollCheck: function startScrollCheck() {
    var component = this;
    function step() {
      component.scrollCheck();
      nextStep();
    }
    function nextStep() {
      if (window.requestAnimationFrame) {
        component._animationFrame = requestAnimationFrame(step);
      } else {
        component._animationFrame = setTimeout(step, 16);
      }
    }
    nextStep();
  },
  cancelScrollCheck: function cancelScrollCheck() {
    if (this._animationFrame) {
      if (window.requestAnimationFrame) {
        cancelAnimationFrame(this._animationFrame);
      } else {
        clearTimeout(this._animationFrame);
      }
      this._animationFrame = undefined;
    }
  },
  scrollCheck: function scrollCheck() {
    var element = this.element;
    var scrollLeft = element.scrollLeft;
    var scrollTop = element.scrollTop;
    var scrollChanged = false;
    if (scrollLeft !== this._appliedScrollLeft || scrollTop !== this._appliedScrollTop) {
      scrollChanged = true;
      this._appliedScrollLeft = scrollLeft;
      this._appliedScrollTop = scrollTop;
    }

    var clientWidth = element.clientWidth;
    var clientHeight = element.clientHeight;
    var clientSizeChanged = false;
    if (clientWidth !== this._clientWidth || clientHeight !== this._clientHeight) {
      clientSizeChanged = true;
      this._clientWidth = clientWidth;
      this._clientHeight = clientHeight;
    }

    if (scrollChanged || clientSizeChanged) {
      Ember.run.join(this, function sendActionsFromScrollCheck() {
        if (scrollChanged) {
          this.sendAction('scrollChange', scrollLeft, scrollTop);
        }
        if (clientSizeChanged) {
          this.sendAction('clientSizeChange', clientWidth, clientHeight);
        }
      });
    }
  }
});
