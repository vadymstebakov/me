import SmoothLine from './SmoothLine';
import {debounce} from './customMethods';

const smoothLine = new SmoothLine();

export default class Resize {
	static _resized() {
		smoothLine.checkResize();
	}

	static init() {
		window.addEventListener('resize', debounce(Resize._resized, 50), false);
	}
}
