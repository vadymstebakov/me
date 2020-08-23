export default class Cookie {
    static getCookie(name) {
        const matches = document.cookie.match(
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

        Object.keys(options).forEach(key => {
            const optionValue = options[key];
            updatedCookie += `; ${key}`;

            if (optionValue !== true) {
                updatedCookie += `=${optionValue}`;
            }
        });

        document.cookie = updatedCookie;
    }

    static deleteCookie(name) {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);

        Cookie.setCookie(name, '', {
            expires: date,
        });
    }
}
