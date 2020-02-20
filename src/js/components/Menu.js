const popups = document.querySelectorAll('.popup');

export default class Menu {
	constructor(menu) {
		this.menu = document.querySelector(menu);
		this._toggleHandler = this._toggleHandler.bind(this);
	}

	_toggleHandler(e) {
		e.preventDefault();
		this.menu.closest('#header').classList.toggle('active');

		[...popups].forEach(popup => {
			popup.classList.toggle('popup--update-padding');
		});
	}

	init() {
		this.menu.addEventListener('click', this._toggleHandler, false);
	}
}
