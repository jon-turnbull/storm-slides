/**
 * @name storm-component-boilerplate: 
 * @version 1.2.0: Mon, 16 Oct 2017 16:25:34 GMT
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
	activeClass: 'is--active',
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

		this.items = [].slice.call(document.querySelectorAll(this.settings.itemSelector));
		this.imageCache = [];
		this.nextButton = document.querySelector(this.settings.buttonNextSelector);
		this.previousButton = document.querySelector(this.settings.buttonPreviousSelector);
		this.navItems = [].slice.call(document.querySelectorAll(this.settings.navItemSelector));
		this.currentIndex = this.settings.startIndex;
		this.initHandlers();
		this.items[this.currentIndex].classList.add(this.settings.activeClass);

		this.settings.preload ? this.items.forEach(function (item, i) {
			_this.loadImage(i);
		}) : this.loadImages(this.currentIndex);

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
	loadImage: function loadImage(i) {
		var _this3 = this;

		var img = new Image(),
		    loaded = function loaded() {
			/*
   let srcsetAttribute = this.items[i].srcset ? ` srcset="${this.items[i].srcset}"` : '',
   	sizesAttribute = this.items[i].sizes ? ` sizes="${this.items[i].sizes}"` : '';
   imageContainer.innerHTML = `<img class="${imageClassName}" src="${this.items[i].src}" alt="${this.items[i].title}"${srcsetAttribute}${sizesAttribute}>`;
   this.items[i].classList.remove('is--loading');
   img.onload = null;
   */
		};
		img.onload = loaded;
		img.src = this.items[i].src;
		img.onerror = function () {
			_this3.items[i].classList.remove('is--loading');
			_this3.items[i].classList.add('has--error');
		};
	},
	loadImages: function loadImages(i) {
		var _this4 = this;

		if (this.imageCache.length === this.items) return;

		var indexes = [i];

		if (this.items.length > 1) indexes.push(i === 0 ? this.items.length - 1 : i - 1);
		if (this.items.length > 2) indexes.push(i === this.items.length - 1 ? 0 : i + 1);

		indexes.forEach(function (idx) {
			if (_this4.imageCache[idx] === undefined) {
				_this4.items[idx].classList.add('loading');
				_this4.loadImage(idx);
			}
		});
	},
	reset: function reset() {
		this.items[this.currentIndex].classList.remove(this.settings.activeClass);

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
		this.change(this.currentIndex === this.items.length - 1 ? 0 : this.currentIndex + 1);
	},
	previous: function previous() {
		this.change(this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1);
	},
	change: function change(index) {
		if (index === this.currentIndex) return;

		this.loadImages(index);

		this.reset();

		index = index === -1 ? this.items.length - 1 : index === this.items.length ? 0 : index;

		var isForwards = (index > this.currentIndex || index === 0 && this.currentIndex === this.items.length - 1) && !(index === this.items.length - 1 && this.currentIndex === 0);

		this.items[this.currentIndex].classList.add(isForwards ? this.settings.hidePreviousClass : this.settings.hideNextClass);
		this.items[index].classList.add(this.settings.activeClass);
		this.items[index].classList.add('' + (isForwards ? this.settings.showNextClass : this.settings.showPreviousClass));

		this.currentIndex = index;

		this.settings.callback && typeof this.settings.callback === 'function' && this.settings.callback();
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
