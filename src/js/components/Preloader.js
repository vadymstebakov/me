import SmoothLine from './SmoothLine';
import Text from './Text';

const smoothLine = new SmoothLine();
const text = new Text('type-text');
let delayId, hideDelayId;

export default class Preloader {
    constructor(selector) {
        this.selector = document.querySelector(selector);
    }

    init() {
        return new Promise(resolve => {
            delayId = setTimeout(resolve, 500);
        }).then(() => {
            clearTimeout(delayId);

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

    delayedHide(delay) {
        hideDelayId = setTimeout(() => {
            clearTimeout(hideDelayId);
            return this.selector.classList.remove('loading');
        }, delay);
    }
}
