const arrColors = [
	'#cabbf1',
	'#fffdc7',
	'#d7fff1',
	'#a0db8e',
	'#4CA1AF',
	'#3498db',
	'#4B79A1',
];
const mixColors = arrColors.sort(() => Math.random() - 0.5).join(', ');

export default class SetGradient {
	static inject(main) {
		document.querySelector(
			main
		).style.backgroundImage = `linear-gradient(-45deg, ${mixColors})`;
	}
}
