import is from 'is_js';

export class IE {
    static init() {
        if (is.ie(11)) {
            const textGradient = document.querySelectorAll('.text--gradient');

            for (let i = 0; i < textGradient.length; i++) {
                textGradient[i].classList.remove('text--gradient');
            }
        }
    }
}
