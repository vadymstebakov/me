import { rAF } from '@helpers/utils';
import is from 'is_js';

export default class PerspectiveText {
    static _mouseMoveHandler(el) {
        return e => {
            const x = e.pageX - el.offsetLeft - el.offsetWidth / 2;
            const y = e.pageY - el.offsetTop - el.offsetHeight / 2;
            const p = el.offsetWidth * 5;

            el.classList.remove('t-transition');
            el.style.setProperty('--tx', `${-x / 70}px`);
            el.style.setProperty('--ty', `${y / 70}px`);
            el.style.setProperty('--ry', `${x / 90}deg`);
            el.style.setProperty('--rx', `${-y / 90}deg`);
            el.style.setProperty('--p', `${p}px`);
        };
    }

    static _resetPerspectiveText(el) {
        return () => {
            el.classList.add('t-transition');
            el.classList.remove('t-transition');
            el.style.setProperty('--tx', '0px');
            el.style.setProperty('--ty', '0px');
            el.style.setProperty('--ry', '0deg');
            el.style.setProperty('--rx', '0deg');
            el.style.setProperty('--p', '0px');
        };
    }

    static init(wrap, el) {
        if (is.tablet() || is.mobile() || is.ie() || is.edge()) return;

        wrap.addEventListener('mousemove', rAF(PerspectiveText._mouseMoveHandler(el)), false);
        wrap.addEventListener('mouseleave', rAF(PerspectiveText._resetPerspectiveText(el)), false);
    }
}
