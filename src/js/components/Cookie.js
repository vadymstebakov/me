export default class Cookie {
    static getCookie(name) {
        let matches = document.cookie.match(
            new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`)
        );

        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    static setCookie(name, value, options = {}) {
        let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        options = {
            path: '/',
            ...options,
        };

        for (let optionKey in options) {
            let optionValue = options[optionKey];
            updatedCookie += `; ${optionKey}`;

            if (optionValue !== true) {
                updatedCookie += `=${optionValue}`;
            }
        }

        document.cookie = updatedCookie;
    }

    static deleteCookie(name) {
        let date = new Date();
        date.setMonth(date.getMonth() - 1);

        Cookie.setCookie(name, '', {
            expires: date,
        });
    }
}
