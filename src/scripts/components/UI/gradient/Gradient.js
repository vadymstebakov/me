import { mixColors } from './gradient.function';

export default class SetGradient {
    static init(main) {
        document.querySelector(main).style.backgroundImage = `linear-gradient(-45deg, ${mixColors})`;
    }
}
