import IE from './components/IE';
import SymbolSprite from './components/SymbolSprite';
import SmoothLine from './components/SmoothLine';
import Gradient from './components/Gradient';
import Menu from './components/Menu';
import Preloader from './components/Preloader';
import Popup from './components/Popup';
import Language from './components/Language';
import Transorm from './components/Transform';
import Resize from './components/Resize';

// Check IE
IE.init();

// Set symbol sprite
SymbolSprite.inject('../images/symbol-sprite/symbol-sprite.html', 24);

// Init preloader
const preloader = new Preloader('.preloader');
preloader.init();

// Set gradient
Gradient.inject('.main');

// Init smooth line
const smoothLine = new SmoothLine();
smoothLine.init();

// Init laguage
Language.init(document.getElementById('language'));

// Toggle menu
const menu = new Menu('.header__humburger');
menu.init();

// Init popup
const popup = new Popup('.popup');
popup.init();

// Init transform effect
Transorm.init(document.querySelector('.main'), document.getElementById('type-text'));

// Init resize
Resize.init();
