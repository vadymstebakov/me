export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const rAF = cb => {
    let globalID;
    let ticking = false;
    return function (...args) {
        if (!ticking) {
            cancelAnimationFrame(globalID);
            globalID = null;
            globalID = requestAnimationFrame(() => {
                ticking = false;
                return cb(...args);
            });
            ticking = true;
        }
    };
};
