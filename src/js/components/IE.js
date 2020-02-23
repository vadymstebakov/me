import is from 'is_js';

export default class IE {
	static init() {
		if (is.ie(10) || is.ie(9)) document.querySelector('body').innerHTML = '';
	}
}
