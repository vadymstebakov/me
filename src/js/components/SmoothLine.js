const nav = document.querySelector('.header__nav');
const links = nav.querySelectorAll('.header__nav-link');
const line = nav.querySelector('.header__line');
let newWidth = nav.clientWidth;
let oldWidth;

const handleSmoothLine = el => {
	links.forEach(link => {
		link.classList.remove('active');
	});

	line.style.width = `${el.offsetWidth}px`;
	line.style.left = `${el.offsetLeft}px`;
	el.classList.add('active');
};

const activeSmoothLine = el =>
	el.classList.contains('active') && handleSmoothLine(el);

export default class SmoothLine {
	constructor() {
		this._initSmoothLine();
	}

	_initSmoothLine() {
		nav.addEventListener('click', this._checkSmoothLine.bind(this), false);
	}

	_checkSmoothLine(e) {
		e.preventDefault();
		const link = e.target.closest('.header__nav-link');

		if (!link) return;

		handleSmoothLine(link);
	}

	eachItems() {
		links.forEach(link => {
			activeSmoothLine(link);
		});
	}

	checkResize() {
		oldWidth = nav.clientWidth;

		if (newWidth !== oldWidth) {
			newWidth = nav.clientWidth;
			this.eachItems();
		}
	}
}
