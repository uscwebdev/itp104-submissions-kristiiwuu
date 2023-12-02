(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SlideShowAd = function () {
  function SlideShowAd(element, options) {
    _classCallCheck(this, SlideShowAd);

    this.element = element;
    this.$element = (0, _jquery2.default)(element);
    this.linkNumber = 1;
    this.i = 2;
    this.setTimer = '';
    this.adImg = this.$element.find('a').eq(0).find('img').eq(0);
    this.displayImgFlag = 'div1';
    this.div1 = (0, _jquery2.default)('<div>');
    this.div2 = (0, _jquery2.default)('<div>');
    this.div3 = (0, _jquery2.default)('<div>').attr('class', 'cb-slideshow');
    this.link = '';
    this.conf = {};
    this.options = options;
    this.defaults = {
      ad: [],
      width: '',
      height: '',
      zIndex: 999,
      duration: 1000,
      interval: 5000,
      targetBlank: false,
      slideShowType: 'fade',
      backgroundColor: '#f5f5f5'
    };
  }

  _createClass(SlideShowAd, [{
    key: 'fadeImg',
    value: function fadeImg(div) {
      var _this2 = this;

      var d1 = div === 'div1' ? 'div1' : 'div2';
      var d2 = div === 'div1' ? 'div2' : 'div1';
      var d3 = this.div3;
      this.link = this.conf.ad[this.linkNumber].url;
      d3.attr('data', this.link);

      this[d1].animate({
        opacity: 0
      }, this.conf.duration, function () {
        _this2[d1].css({
          'z-index': 0,
          'background-image': 'url(' + _this2.conf.ad[_this2.i].img + ')'
        });
        _this2.linkNumber++;
        _this2.i++;
      });
      this[d2].css({
        'z-index': 1
      }).animate({
        opacity: 1
      }, this.conf.duration);
      this.displayImgFlag = d2;
    }
  }, {
    key: 'flipImg',
    value: function flipImg(div, r) {
      var _this3 = this;

      var d1 = div === 'div1' ? 'div1' : 'div2';
      var d2 = div === 'div1' ? 'div2' : 'div1';
      var d3 = this.div3;
      var deg = div === 'div1' ? '180deg' : '0deg';
      var rotate = '';
      if (r === 'X') {
        rotate = 'rotateX(' + deg + ')';
      }
      if (r === 'Y') {
        rotate = 'rotateY(' + deg + ')';
      }
      this.link = this.conf.ad[this.linkNumber].url;
      d3.attr('data', this.link);

      d3.css({
        perspective: 0,
        transition: '1s',
        transform: rotate,
        transformStyle: 'preserve-3d'
      });

      this[d2].css({
        transform: rotate
      });

      setTimeout(function () {
        _this3[d1].css({
          'background-image': 'url(' + _this3.conf.ad[_this3.i].img + ')',
          opacity: 0
        });
        _this3[d2].css('opacity', 1);
        _this3.linkNumber++;
        _this3.i++;
        _this3.displayImgFlag = d2;
      }, 300);
    }
  }, {
    key: 'slideImg',
    value: function slideImg(div, d) {
      var _d2$css,
          _this4 = this;

      var d1 = div === 'div1' ? 'div1' : 'div2';
      var d2 = div === 'div1' ? 'div2' : 'div1';
      var direction = d;
      var directionValue = '';
      if (d === 'left' || d === 'right') {
        directionValue = this.conf.width;
      }
      if (d === 'top' || d === 'bottom') {
        directionValue = this.conf.height;
      }
      this.link = this.conf.ad[this.linkNumber].url;
      this[d1].css(_defineProperty({
        top: 'auto',
        left: 'auto'
      }, direction, 0));
      this[d2].css((_d2$css = {
        top: 'auto',
        left: 'auto'
      }, _defineProperty(_d2$css, direction, '-' + directionValue + 'px'), _defineProperty(_d2$css, 'opacity', 1), _d2$css));

      this[d1].stop().animate(_defineProperty({}, direction, directionValue + 'px'), 1000, function () {
        _this4[d1].css({
          'background-image': 'url(' + _this4.conf.ad[_this4.i].img + ')'
        });
        _this4.linkNumber++;
        _this4.i++;
        _this4.displayImgFlag = d2;
      });
      this[d2].stop().animate(_defineProperty({}, direction, 0), 1000);
    }
  }, {
    key: 'changeImg',
    value: function changeImg() {
      if (this.linkNumber >= this.conf.ad.length) {
        this.linkNumber = 0;
      }
      if (this.i >= this.conf.ad.length) {
        this.i = 0;
      }

      switch (this.conf.slideShowType) {
        case 'fade':
          return this.fadeImg(this.displayImgFlag);
        case 'flipX':
          return this.flipImg(this.displayImgFlag, 'X');
        case 'flipY':
          return this.flipImg(this.displayImgFlag, 'Y');
        case 'slideLeft':
          return this.slideImg(this.displayImgFlag, 'left');
        case 'slideRight':
          return this.slideImg(this.displayImgFlag, 'right');
        case 'slideTop':
          return this.slideImg(this.displayImgFlag, 'top');
        case 'slideBottom':
          return this.slideImg(this.displayImgFlag, 'bottom');
        case 'none':
          this.conf.duration = 0;
          return this.fadeImg(this.displayImgFlag);
        default:
          return false;
      }
    }
  }, {
    key: 'makeBg',
    value: function makeBg() {
      var div1DisplayStyle = {};
      var div2DisplayStyle = {};
      if (this.conf.slideShowType === 'fade') {
        div1DisplayStyle = { 'z-index': 1 };
        div2DisplayStyle = { 'z-index': 0 };
      }
      var divStyle = {
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-color': this.conf.backgroundColor,
        position: 'absolute',
        top: 0,
        left: 0,
        width: this.conf.width,
        height: this.conf.height
      };
      var div1Style = _jquery2.default.extend({}, div1DisplayStyle, {
        'background-image': 'url(' + this.conf.ad[0].img + ')',
        opacity: 1
      });
      var div2Style = _jquery2.default.extend({}, div2DisplayStyle, {
        'background-image': 'url(' + this.conf.ad[1].img + ')',
        opacity: 0
      });
      var div3Style = {
        'z-index': this.conf.zIndex,
        position: 'relative',
        display: 'inline-block',
        width: this.conf.width,
        height: this.conf.height,
        cursor: 'pointer',
        overflow: 'hidden'
      };

      this.link = this.conf.ad[0].url;
      this.div1.css(_jquery2.default.extend({}, divStyle, div1Style));
      this.div2.css(_jquery2.default.extend({}, divStyle, div2Style));
      this.div3.append(this.div1, this.div2).css(div3Style).attr('data', this.link);
      this.$element.after(this.div3);
    }
  }, {
    key: 'preloadImg',
    value: function preloadImg() {
      this.conf.ad.forEach(function (obj) {
        var imgTag = document.createElement('img');
        imgTag.src = obj.img;
        // imgTag.src = obj.impimg;
      });
    }
  }, {
    key: 'getAd',
    value: function getAd() {
      var _this = this;
      _this.$element.find('a').each(function getAdInfo() {
        var $this = (0, _jquery2.default)(this);
        var adObj = {};
        var img = $this.find('img').eq(0).attr('src') || '';
        var url = $this.attr('href') || '';
        var impimg = $this.children().eq(0).attr('src') || '';
        adObj = { img: img, url: url, impimg: impimg };
        _this.defaults.ad.push(adObj);
      });
      return _this.ad;
    }
  }, {
    key: 'getImgSize',
    value: function getImgSize() {
      var imgSize = {};
      if (this.adImg.attr('width') && this.adImg.attr('height')) {
        this.defaults.width = this.adImg.attr('width');
        this.defaults.height = this.adImg.attr('height');
        imgSize.width = this.defaults.width;
        imgSize.height = this.defaults.height;
      } else {
        var imgObj = new Image();
        imgObj.src = this.adImg.attr('src');
        this.defaults.width = imgObj.width;
        this.defaults.height = imgObj.height;
        imgSize.width = this.defaults.width;
        imgSize.height = this.defaults.height;
      }
      return imgSize;
    }
  }, {
    key: 'clickAd',
    value: function clickAd() {
      var _this5 = this;

      this.div3.on('click', function (e) {
        e.preventDefault();
        if (_this5.conf.targetBlank) {
          window.open(_this5.link);
        } else {
          window.location.href = _this5.link;
        }
      });
    }
  }, {
    key: 'init',
    value: function init() {
      var _this6 = this;

      this.getAd();
      this.getImgSize();
      this.conf = _jquery2.default.extend({}, this.defaults, this.options);
      this.$element.css({
        display: 'none',
        width: this.conf.width,
        height: this.conf.height
      });
      this.makeBg();
      if (this.conf.ad.length) {
        this.preloadImg();
        this.setTimer = setInterval(function () {
          _this6.changeImg();
        }, this.conf.interval);
      }
      this.clickAd();
      return this;
    }
  }]);

  return SlideShowAd;
}();

exports.default = SlideShowAd;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _jquery = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

var _SlideShowAd = require('SlideShowAd');

var _SlideShowAd2 = _interopRequireDefault(_SlideShowAd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (factory) {
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory((typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null), require('SlideShowAd'), window, document);
  } else {
    factory(_jquery2.default);
  }
})(function ($) {
  $.extend($.fn, {
    slideShowAd: function slideShowAd(options) {
      var _this = this;

      return this.each(function () {
        new _SlideShowAd2.default(_this, options).init();
      });
    }
  });
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"SlideShowAd":1}]},{},[2]);
