import Preloader from './Preloader';
import SmoothLine from './SmoothLine';
import Cookie from './Cookie';
import locale from '../../assets/locale.json';

const preloader = new Preloader('.preloader');
const smoothLine = new SmoothLine();
let delayId;

export default class Language {
	static _changeText(name, object, startIndex) {
		for (let key in object) {
			if (
				Array.isArray(object[key]) &&
				typeof object[key] != 'string' &&
				typeof object[key][0] == 'string'
			) {
				Language._getArrayText(key, object, name);
			} else if (typeof object[key] == 'object') {
				isNaN(key)
					? Language._changeText(`${name}-${key}`, object[key])
					: Language._changeText(name, object[key], key);
			} else {
				Language._getText(key, object, name, startIndex);
			}
		}
	}

	static _getText(key, object, name, startIndex) {
		let elementKey = 0;

		if (startIndex) elementKey = startIndex;

		for (
			;
			elementKey < document.getElementsByClassName(`${name}-${key}`).length;
			elementKey++
		) {
			if (!isNaN(elementKey)) {
				document.getElementsByClassName(`${name}-${key}`)[
					elementKey
				].textContent = object[key];
			}
		}
	}

	static _getArrayText(key, object, name, startIndex) {
		let elementKey = 0;

		if (startIndex) elementKey = startIndex;

		for (
			;
			elementKey < document.getElementsByClassName(`${name}-${key}`).length;
			elementKey++
		) {
			if (!isNaN(elementKey)) {
				document.getElementsByClassName(`${name}-${key}`)[
					elementKey
				].textContent = object[key][elementKey % object[key].length];
			}
		}
	}

	static _changeLocale(lang) {
		if (!locale[lang]) return alert('Not found language');

		Language._changeText('locale', locale[lang]);
	}

	static _switcherHandler(switcher) {
		preloader.show();

		return new Promise(resolve => {
			delayId = setTimeout(resolve, 400);
		})
			.then(() => {
				clearTimeout(delayId);

				const date = new Date();
				date.setMonth(date.getMonth() + 1).toLocaleString();

				if (Cookie.getCookie('language')) Cookie.deleteCookie('language');

				if (switcher.checked) {
					Language._changeLocale('ru');
					Cookie.setCookie('language', 'ru', {
						expires: date,
						samesite: 'strict',
					});
				} else {
					Language._changeLocale('en');
					Cookie.setCookie('language', 'en', {
						expires: date,
						samesite: 'strict',
					});
				}

				smoothLine.eachItems();
				preloader.delayedHide(400);
			})
			.catch(err => {
				alert(`${err}\nPlease, try again later.`);
				switcher.checked = false;
				switcher.parentNode.classList.add('switcher--not-allowed');
				preloader.hide();
			});
	}

	static init(switcher) {
		if (Cookie.getCookie('language')) {
			Language._changeLocale(Cookie.getCookie('language'));
			Cookie.getCookie('language') === 'ru'
				? (switcher.checked = true)
				: (switcher.checked = false);
		} else {
			Language._changeLocale('en');
		}

		switcher.addEventListener(
			'change',
			Language._switcherHandler.bind(null, switcher),
			false
		);
	}
}
