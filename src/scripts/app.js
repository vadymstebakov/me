import IE from './components/IE';
import { EventEmitter } from './helpers/EventEmitter';
import SymbolSprite from './components/SymbolSprite';
import SmoothLine from './components/SmoothLine';
import Gradient from './components/Gradient';
import Menu from './components/Menu';
import Preloader from './components/Preloader';
import Popup from './components/Popup';
import Language from './components/Language';
import Transform from './components/Transform';
import Resize from '@helpers/Resize';

// Check IE
IE.init();

// Event Emitter
const emitter = new EventEmitter();

// Set symbol sprite
SymbolSprite.init('../images/symbol-sprite/symbol-sprite.html', 24);

// Init preloader
const preloader = new Preloader('.preloader', { emitter });
preloader.init();

// Set gradient
Gradient.inject('.main');

// Init smooth line
const smoothLine = new SmoothLine({ emitter });
smoothLine.init();

// Init language
const language = new Language({ emitter });
language.init(document.getElementById('language'));

// Toggle menu
const menu = new Menu('.header__humbugger');
menu.init();

// Init popup
const popup = new Popup('.popup');
popup.init();

// Init transform effect
Transform.init(document.querySelector('.main'), document.getElementById('type-text'));

// Init resize
Resize.init(emitter);
