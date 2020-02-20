import Text from './Text';

const text = new Text('type-text');

export default class Popup {
	constructor(popups) {
		this.popups = document.querySelectorAll(popups);
		this.__checkActivePopup = this._checkActivePopup.bind(this);
		this._hidePopup = this._hidePopup.bind(this);
	}

	_checkActivePopup() {
		[...this.popups].forEach(popup => {
			if (popup.classList.contains('active')) {
				popup.classList.remove('active');
			}
		});
	}

	_delegation(e, selector) {
		const target = e.target.closest(`.${selector}`);

		if (!target) return;

		this.__checkActivePopup();

		if (selector === 'hide-popup') {
			text.show();
		} else {
			text.hide();

			const activePopup = `.${target.getAttribute('data-popup')}`;
			document.querySelector(activePopup).classList.add('active');
		}
	}

	_hidePopup() {
		document.body.addEventListener(
			'click',
			e => this._delegation(e, 'hide-popup'),
			false
		);
	}

	init() {
		document.body.addEventListener(
			'click',
			e => this._delegation(e, 'show-popup'),
			false
		);

		this._hidePopup();
	}
}
