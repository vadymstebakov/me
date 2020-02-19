export const asyncForEach = (arr, cb) => {
	arr.forEach((item, index, array) => {
		setTimeout(cb, 0, [item, index, array]);
	});
};
