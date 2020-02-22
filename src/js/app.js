import SymbolSprite from './components/SymbolSprite';
import SmoothLine from './components/SmoothLine';
import Gradient from './components/Gradient';
import Menu from './components/Menu';
import Preloader from './components/Preloader';
import Popup from './components/Popup';
// import locale from '../assets/locale.json';

// console.log(locale);

// Check useagent
document.documentElement.setAttribute('data-useragent', navigator.userAgent);

// Set symbol sprite
SymbolSprite.inject('../images/symbol-sprite/symbol-sprite.html');

// Init preloader
const preloader = new Preloader('.preloader');
preloader.init();

// Set gradient
Gradient.inject('.main');

// Init smooth line
const smoothLine = new SmoothLine();
smoothLine.init();

// Toggle menu
const menu = new Menu('.header__humburger');
menu.init();

// Init popup
const popup = new Popup('.popup');
popup.init();

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
