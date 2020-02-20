import SmoothLine from './SmoothLine';
import Text from './Text';

const smoothLine = new SmoothLine();
const text = new Text('type-text');

export default class Preloader {
	constructor(selector) {
		this.selector = document.querySelector(selector);
	}

	init() {
		return new Promise(resolve => {
			setTimeout(resolve, 500);
		}).then(() => {
			smoothLine.eachItems();
			this.selector.classList.remove('loading');
			text.initTyping(500);
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
