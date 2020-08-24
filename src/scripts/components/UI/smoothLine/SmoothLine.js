import { asyncForEach } from '@helpers/utils';
import { handleSmoothLine, activeSmoothLine } from './smoothLine.function';

const nav = document.querySelector('.header__nav');
const links = nav.querySelectorAll('.header__nav-link');
const line = nav.querySelector('.header__line');

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

        handleSmoothLine(link, links, line);
    }

    init() {
        nav.addEventListener('click', this._checkSmoothLine, false);
        this._checkResize();
    }

    eachItems() {
        asyncForEach([...links], ([link]) => {
            activeSmoothLine(link, links, line);
        });
    }

    _checkResize() {
        this.emitter.on('page:resized', ([width, height]) => {
            this.eachItems();
        });
    }
}
