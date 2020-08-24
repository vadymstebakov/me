export const handleSmoothLine = (el, links, line) => {
    [...links].forEach(link => {
        link.classList.remove('active');
    });

    line.style.width = `${el.offsetWidth}px`;
    line.style.left = `${el.offsetLeft}px`;
    el.classList.add('active');
};

export const activeSmoothLine = (el, links, line) =>
    el.classList.contains('active') && handleSmoothLine(el, links, line);
