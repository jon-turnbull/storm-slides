/**
 * @name storm-component-boilerplate: 
 * @version 1.2.0: Mon, 16 Oct 2017 20:29:06 GMT
 * @author stormid
 * @license MIT
 */
(function(root, factory) {
   var mod = {
       exports: {}
   };
   if (typeof exports !== 'undefined'){
       mod.exports = exports
       factory(mod.exports)
       module.exports = mod.exports.default
   } else {
       factory(mod.exports);
       root.gulpWrapUmd = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var defaults = {
	buttonPreviousSelector: '.js-slides__previous',
	buttonNextSelector: '.js-slides__next',
	navItemSelector: '.js-slides__nav-item',
	itemSelector: '.js-slides__item',
	liveRegionSelector: '.js-slides__liveregion',
	loadingClass: 'is--loading',
	activeClass: 'is--current',
	showPreviousClass: 'show--previous',
	showNextClass: 'show--next',
	hidePreviousClass: 'hide--previous',
	hideNextClass: 'hide--next',
	isCarousel: true,
	startIndex: 0,
	preload: false
};

var KEY_CODES = {
	ENTER: 13
};
var TRIGGER_EVENTS = ['click', 'keydown'];

var componentPrototype = {
	init: function init() {
		var _this = this;

		this.slides = [].slice.call(document.querySelectorAll(this.settings.itemSelector)).map(function (slide) {
			return {
				unloadedImgs: [].slice.call(slide.querySelectorAll('[data-srcset], [data-src]')),
				container: slide
			};
		});

		this.nextButton = document.querySelector(this.settings.buttonNextSelector);
		this.previousButton = document.querySelector(this.settings.buttonPreviousSelector);
		this.navItems = [].slice.call(document.querySelectorAll(this.settings.navItemSelector));
		this.notification = this.node.querySelector(this.settings.liveRegionSelector);
		this.setCurrent(this.settings.startIndex);
		this.slides[this.currentIndex].container.classList.add(this.settings.activeClass);
		this.initHandlers();
		this.settings.preload ? this.slides.forEach(function (slide, i) {
			_this.loadImage(i);
		}) : this.loadImages(this.settings.startIndex);

		return this;
	},
	initHandlers: function initHandlers() {
		var _this2 = this;

		TRIGGER_EVENTS.forEach(function (ev) {
			['previous', 'next'].forEach(function (type) {
				if (_this2[type + 'Button']) _this2[type + 'Button'].addEventListener(ev, function (e) {
					if (e.keyCode && e.keyCode !== KEY_CODES.ENTER) return;
					_this2[type]();
				});
			});
			_this2.navItems.length > 0 && _this2.navItems.forEach(function (item, i) {
				item.addEventListener(ev, function (e) {
					if (e.keyCode && e.keyCode !== KEY_CODES.ENTER) return;
					_this2.change(i);
				});
			});
		});
	},
	loadImages: function loadImages(i) {
		var _this3 = this;

		if (!this.node.querySelector('[data-src], [data-srcset]')) return;
		var indexes = [i];

		if (this.slides.length > 1) indexes.push(i === 0 ? this.slides.length - 1 : i - 1);
		if (this.slides.length > 2) indexes.push(i === this.slides.length - 1 ? 0 : i + 1);

		indexes.forEach(function (idx) {
			if (!_this3.slides[idx].unloadedImgs.length) return;

			_this3.slides[idx].container.classList.add(_this3.settings.loadingClass);
			_this3.slides[idx].unloadedImgs = _this3.slides[idx].unloadedImgs.reduce(function (acc, el) {
				['src', 'srcset'].forEach(function (type) {
					if (el.hasAttribute('data-' + type)) {
						el.setAttribute(type, el.getAttribute('data-' + type));
						el.removeAttribute('data-' + type);
					}
					_this3.slides[idx].container.classList.remove(_this3.settings.loadingClass);
				});
				return acc;
			}, []);
		});
	},
	reset: function reset() {
		this.slides[this.currentIndex].container.classList.remove(this.settings.activeClass);
		this.slides[this.currentIndex].container.removeAttribute('tabindex');
		this.navItems.length && this.navItems[this.currentIndex].removeAttribute('aria-current');

		var previouslyHidden = this.node.querySelector('.' + this.settings.hidePreviousClass),
		    previouslyShown = this.node.querySelector('.' + this.settings.showPreviousClass),
		    nextShown = this.node.querySelector('.' + this.settings.showNextClass),
		    nextHidden = this.node.querySelector('.' + this.settings.hideNextClass);

		previouslyHidden && previouslyHidden.classList.remove(this.settings.hidePreviousClass);
		previouslyShown && previouslyShown.classList.remove(this.settings.showPreviousClass);
		nextShown && nextShown.classList.remove(this.settings.showNextClass);
		nextHidden && nextHidden.classList.remove(this.settings.hideNextClass);
	},
	next: function next() {
		this.change(this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1);
	},
	previous: function previous() {
		this.change(this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1);
	},
	change: function change(index) {
		if (index === this.currentIndex) return;

		this.reset();
		this.loadImages(index);

		index = index === -1 ? this.slides.length - 1 : index === this.slides.length ? 0 : index;
		var isForwards = (index > this.currentIndex || index === 0 && this.currentIndex === this.slides.length - 1) && !(index === this.slides.length - 1 && this.currentIndex === 0);

		this.slides[this.currentIndex].container.classList.add(isForwards ? this.settings.hidePreviousClass : this.settings.hideNextClass);
		this.slides[index].container.classList.add(this.settings.activeClass);
		this.slides[index].container.classList.add('' + (isForwards ? this.settings.showNextClass : this.settings.showPreviousClass));
		this.setCurrent(index);

		this.settings.callback && typeof this.settings.callback === 'function' && this.settings.callback();
	},
	setCurrent: function setCurrent(i) {
		this.slides[i].container.setAttribute('tabindex', '-1');
		this.slides[i].container.focus();
		this.navItems.length && this.navItems[i].setAttribute('aria-current', true);
		this.notification.innerHTML = 'Slide ' + (i + 1) + ' of ' + this.slides.length;
		this.currentIndex = i;
	}
};

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));
	//let els = Array.from(document.querySelectorAll(sel));

	if (!els.length) return console.warn('Slides not initialised, no augmentable elements found');

	return els.map(function (el) {
		return Object.assign(Object.create(componentPrototype), {
			node: el,
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

var index = { init: init };

exports.default = index;;
}));
