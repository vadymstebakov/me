import SymbolSprite from './components/SymbolSprite';
import SmoothLine from './components/SmoothLine';
import SetGradient from './components/SetGradient';
import Menu from './components/Menu';
import locale from '../assets/locale.json';

console.log(locale);

// Check useagent
document.documentElement.setAttribute('data-useragent', navigator.userAgent);

// Set symbol sprite
let symbolSprite = new SymbolSprite(
	'../images/symbol-sprite/symbol-sprite.html'
);
symbolSprite.toInject();

// Init smooth line
let smoothLine = new SmoothLine();
smoothLine.eachItems();

// Set gradient
SetGradient.inject(document.querySelector('.main'));

// Toggle menu
let menu = new Menu('.header__humburger');
menu.toggleMenu();

// Resize function
(function fnResize() {
	let doit;

	function resized() {
		smoothLine.checkResize();
	}

	window.onresize = () => {
		clearTimeout(doit);
		doit = setTimeout(resized, 50);
	};
})();
