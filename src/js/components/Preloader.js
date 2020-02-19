export default class Preloader {
	constructor(selector) {
		this.selector = document.querySelector(selector);
	}

	init() {
		return new Promise(resolve => {
			setTimeout(resolve, 500);
		}).then(() => {
			this.selector.classList.remove('loading');
			// typingFn.stratTyping();
		});
	}

	show() {
		this.selector.classList.add('loading');
	}

	hide() {
		this.selector.classList.remove('loading');
	}

	delayedHide() {
		setTimeout(() => this.selector.classList.remove('loading'), 400);
	}
}
