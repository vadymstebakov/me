const popups = document.querySelectorAll('.popup');

export default class Menu {
	constructor(humburger) {
		this.humburger = document.querySelector(humburger);

		this.clickHandler = this.clickHandler.bind(this);
	}

	bindEvents() {
		this.humburger.addEventListener('click', this.clickHandler, false);
	}

	clickHandler() {
		event.preventDefault();
		this.humburger.closest('#header').classList.toggle('active');

		popups.forEach(popup => {
			popup.classList.toggle('popup--update-padding');
		});
	}
}
