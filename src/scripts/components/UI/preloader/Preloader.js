import SmoothLine from '../smoothLine/SmoothLine';
import TypingText from '../typingText/TypingText';

let delayId, hideDelayId;

export default class Preloader {
    constructor(selector, options) {
        this.selector = document.querySelector(selector);
    }

    init() {
        const smoothLine = new SmoothLine({});
        const text = new TypingText('type-text');

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
