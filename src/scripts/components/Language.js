import Preloader from './Preloader';
import SmoothLine from './SmoothLine';
import Cookie from './Cookie';
import locale from '@assets/locale.json';

let delayId;

export default class Language {
    constructor(options) {
        this.preloader = new Preloader('.preloader', { emitter: options.emitter });
        this.smoothLine = new SmoothLine({ emitter: options.emitter });
    }

    _changeText(name, object, startIndex) {
        for (const key in object) {
            if (Array.isArray(object[key]) && typeof object[key] != 'string' && typeof object[key][0] == 'string') {
                this._getArrayText(key, object, name);
            } else if (typeof object[key] == 'object') {
                isNaN(key) ? this._changeText(`${name}-${key}`, object[key]) : this._changeText(name, object[key], key);
            } else {
                this._getText(key, object, name, startIndex);
            }
        }
    }

    _getText(key, object, name, startIndex) {
        let elementKey = 0;

        if (startIndex) elementKey = startIndex;

        for (; elementKey < document.getElementsByClassName(`${name}-${key}`).length; elementKey++) {
            if (!isNaN(elementKey)) {
                document.getElementsByClassName(`${name}-${key}`)[elementKey].textContent = object[key];
            }
        }
    }

    _getArrayText(key, object, name, startIndex) {
        let elementKey = 0;

        if (startIndex) elementKey = startIndex;

        for (; elementKey < document.getElementsByClassName(`${name}-${key}`).length; elementKey++) {
            if (!isNaN(elementKey)) {
                document.getElementsByClassName(`${name}-${key}`)[elementKey].textContent =
                    object[key][elementKey % object[key].length];
            }
        }
    }

    _changeLocale(lang) {
        if (!locale[lang]) return alert('Not found language');

        this._changeText('locale', locale[lang]);
    }

    _switcherHandler(switcher) {
        this.preloader.show();

        return new Promise(resolve => {
            delayId = setTimeout(resolve, 400);
        })
            .then(() => {
                clearTimeout(delayId);

                const date = new Date();
                date.setMonth(date.getMonth() + 1).toLocaleString();

                if (Cookie.getCookie('language')) Cookie.deleteCookie('language');

                if (switcher.checked) {
                    this._changeLocale('ru');
                    Cookie.setCookie('language', 'ru', {
                        expires: date,
                        samesite: 'strict',
                    });
                } else {
                    this._changeLocale('en');
                    Cookie.setCookie('language', 'en', {
                        expires: date,
                        samesite: 'strict',
                    });
                }

                this.smoothLine.eachItems();
                this.preloader.delayedHide(400);
            })
            .catch(err => {
                alert(`${err}\nPlease, try again later.`);
                switcher.checked = false;
                switcher.parentNode.classList.add('switcher--not-allowed');
                this.preloader.hide();
            });
    }

    init(switcher) {
        if (Cookie.getCookie('language')) {
            this._changeLocale(Cookie.getCookie('language'));
            Cookie.getCookie('language') === 'ru' ? (switcher.checked = true) : (switcher.checked = false);
        } else {
            this._changeLocale('en');
        }

        switcher.addEventListener('change', this._switcherHandler.bind(this, switcher), false);
    }
}
