const langForm = document.querySelector('.header__form--disable');
let makeType;

export default class Text {
	constructor(wrap) {
		this.wrap = document.getElementById(wrap);
		this.textEl = this.wrap.querySelector('.main__text');
		this.newString = '';
	}

	hide() {
		if (!this.wrap.classList.contains('main__text-wrap--hide')) {
			this.wrap.classList.add('main__text-wrap--hide');
		}
	}

	show() {
		if (this.wrap.classList.contains('main__text-wrap--hide')) {
			this.wrap.classList.remove('main__text-wrap--hide');
		}
	}

	initTyping(delay) {
		const textEl = this.textEl;
		const text = textEl.textContent.split('');
		let newString = this.newString;
		textEl.textContent = '|';

		setTimeout(() => {
			textEl.classList.add('active');
			textEl.textContent = '';

			for (let i = 0; i < text.length; i++) {
				makeType = new Promise(resolve => {
					setTimeout(() => {
						newString += text[i];
						textEl.textContent = newString;
						resolve(newString);
					}, i * 150);
				});
			}

			Promise.resolve(makeType).then(() =>
				langForm.classList.remove('header__form--disable')
			);
		}, delay);
	}
}
