export const asyncForEach = (arr, cb, delay = 0) => {
	arr.forEach((item, index, array) => {
		setTimeout(cb, delay, [item, index, array]);
	});
};
