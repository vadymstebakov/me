import SmoothLine from './SmoothLine';
import Text from './Text';

let delayId, hideDelayId;

export default class Preloader {
    constructor(selector, options) {
        this.selector = document.querySelector(selector);
        this.emitter = options.emitter;
    }

    init() {
        const smoothLine = new SmoothLine({ emitter: this.emitter });
        const text = new Text('type-text');

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
