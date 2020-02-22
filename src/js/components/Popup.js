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
		let target = e.target;

		if (target.correspondingUseElement) {
			target = target.correspondingUseElement;
		}

		const el = target.closest(`.${selector}`);

		if (!el) return;

		this.__checkActivePopup();

		if (el.matches('.hide-popup')) {
			text.show();
		} else if (el.matches('.show-popup')) {
			text.hide();

			const activePopup = `.${el.getAttribute('data-popup')}`;
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
