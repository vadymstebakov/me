import SymbolSprite from './components/SymbolSprite';
import SmoothLine from './components/SmoothLine';
import Gradient from './components/Gradient';
import Menu from './components/Menu';
import Preloader from './components/Preloader';
import locale from '../assets/locale.json';

console.log(locale);

// Check useagent
document.documentElement.setAttribute('data-useragent', navigator.userAgent);

// Set symbol sprite
SymbolSprite.inject('../images/symbol-sprite/symbol-sprite.html');

// Init preloader
let preloader = new Preloader('.preloader');
preloader.init();

// Init smooth line
let smoothLine = new SmoothLine();
smoothLine.eachItems();

// Set gradient
Gradient.inject('.main');

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
