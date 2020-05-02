export const asyncForEach = (arr, cb, delay = 0) => {
    arr.forEach((item, index, array) => {
        setTimeout(cb, delay, [item, index, array]);
    });
};

export const debounce = (cb, interval) => {
    let debounceTimeoutId;

    return (...args) => {
        clearTimeout(debounceTimeoutId);
        debounceTimeoutId = setTimeout(() => cb.apply(this, args), interval);
    };
};

export const throttle = (delay, cb) => {
    let lastCall = 0;

    return (...args) => {
        const now = new Date().getTime();

        if (now - lastCall < delay) return;

        lastCall = now;
        return cb(...args);
    };
};

export const rAF = cb => {
    let globalID;
    let ticking = false;

    return (...args) => {
        if (!ticking) {
            cancelAnimationFrame(globalID);
            globalID = requestAnimationFrame(() => {
                ticking = false;
                return cb(...args);
            });
            ticking = true;
        }
    };
};
