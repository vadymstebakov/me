import { asyncForEach } from '@helpers/utils';

const nav = document.querySelector('.header__nav');
const links = nav.querySelectorAll('.header__nav-link');
const line = nav.querySelector('.header__line');

const handleSmoothLine = el => {
    [...links].forEach(link => {
        link.classList.remove('active');
    });

    line.style.width = `${el.offsetWidth}px`;
    line.style.left = `${el.offsetLeft}px`;
    el.classList.add('active');
};

const activeSmoothLine = el => el.classList.contains('active') && handleSmoothLine(el);

export default class SmoothLine {
    constructor(options) {
        this.emitter = options.emitter;
        this._checkSmoothLine = this._checkSmoothLine.bind(this);
    }

    _checkSmoothLine(e) {
        e.preventDefault();
        let target = e.target;

        if (target.correspondingUseElement) {
            target = target.correspondingUseElement;
        }

        const link = target.closest('.header__nav-link');

        if (!link || link.classList.contains('active')) return;

        handleSmoothLine(link);
    }

    init() {
        nav.addEventListener('click', this._checkSmoothLine, false);
        this._checkResize();
    }

    eachItems() {
        asyncForEach([...links], ([link]) => {
            activeSmoothLine(link);
        });
    }

    _checkResize() {
        this.emitter.on('page:resized', ([width, height]) => {
            this.eachItems();
        });
    }
}
