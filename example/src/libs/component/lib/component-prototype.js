const KEY_CODES = {
		ENTER: 13
	},
	TRIGGER_EVENTS = ['click', 'keydown' ];

export default {
	init(){
		this.items = [].slice.call(document.querySelectorAll(this.settings.itemSelector));
		this.imageCache = [];
		this.nextButton = document.querySelector(this.settings.buttonNextSelector);
		this.previousButton = document.querySelector(this.settings.buttonPreviousSelector);
		this.navItems = [].slice.call(document.querySelectorAll(this.settings.navItemSelector));
		this.currentIndex = this.settings.startIndex;
		this.initHandlers();
		this.items[this.currentIndex].classList.add(this.settings.activeClass);
		
		this.settings.preload ? this.items.forEach((item, i) => { this.loadImage(i); }) : this.loadImages(this.currentIndex);

		return this;
	},
	initHandlers(){
		TRIGGER_EVENTS.forEach(ev => {
			['previous', 'next'].forEach(type => {
				if(this[`${type}Button`]) this[`${type}Button`].addEventListener(ev, e => {
					if(e.keyCode && e.keyCode !== KEY_CODES.ENTER) return;
					this[type]();
				});
			});
			this.navItems.length > 0 && this.navItems.forEach((item, i)	 => {
				item.addEventListener(ev, e => {
					if(e.keyCode && e.keyCode !== KEY_CODES.ENTER) return;
					this.change(i);
				})
			});
		});
	},
	loadImage(i) {
		let img = new Image(),
			loaded = () => {
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
		img.onerror = () => {
			this.items[i].classList.remove('is--loading');
			this.items[i].classList.add('has--error');
		};
		if(img.complete) loaded();
	},
	loadImages(i){
		if(this.imageCache.length === this.items) return;

		let indexes = [i];

		if(this.items.length > 1) indexes.push(i === 0 ? this.items.length - 1 : i - 1);
		if(this.items.length > 2) indexes.push(i === this.items.length - 1 ? 0 : i + 1);

		indexes.forEach(idx => {
			if(this.imageCache[idx] === undefined) {
				this.items[idx].classList.add('loading');
				this.loadImage(idx);
			}
		});
	},
	reset(){
		this.items[this.currentIndex].classList.remove(this.settings.activeClass);

		let previouslyHidden = this.node.querySelector(`.${this.settings.hidePreviousClass}`),
			previouslyShown = this.node.querySelector(`.${this.settings.showPreviousClass}`),
			nextShown = this.node.querySelector(`.${this.settings.showNextClass}`),
			nextHidden = this.node.querySelector(`.${this.settings.hideNextClass}`);

		previouslyHidden && previouslyHidden.classList.remove(this.settings.hidePreviousClass);
		previouslyShown && previouslyShown.classList.remove(this.settings.showPreviousClass);
		nextShown && nextShown.classList.remove(this.settings.showNextClass);
		nextHidden && nextHidden.classList.remove(this.settings.hideNextClass);
	},
	next(){
		this.change((this.currentIndex === this.items.length - 1 ? 0 : this.currentIndex + 1));
	},
	previous(){
		this.change((this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1));
	},
	change(index){
		if (index === this.currentIndex) return;

		this.loadImages(index);

		this.reset();

		index = index === -1 ? this.items.length - 1 : index === this.items.length ? 0 : index;
		
		let isForwards = (index > this.currentIndex || index === 0 && this.currentIndex === this.items.length - 1) && !(index === (this.items.length - 1) && this.currentIndex === 0);

		this.items[this.currentIndex].classList.add(isForwards ? this.settings.hidePreviousClass : this.settings.hideNextClass);
		this.items[index].classList.add(this.settings.activeClass);
		this.items[index].classList.add(`${isForwards ? this.settings.showNextClass : this.settings.showPreviousClass}`);
		
		this.currentIndex = index;
	
		(this.settings.callback && typeof this.settings.callback === 'function') && this.settings.callback();
	}
};