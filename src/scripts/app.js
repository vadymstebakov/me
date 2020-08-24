import { EventEmitter } from '@helpers/EventEmitter';
import { isIE } from '@helpers/utils';
import SymbolSprite from '@helpers/SymbolSprite';
import SmoothLine from '@components/UI/smoothLine/SmoothLine';
import Gradient from '@components/UI/gradient/Gradient';
import Menu from '@components/UI/menu/Menu';
import Preloader from '@components/UI/preloader/Preloader';
import Popup from '@components/UI/popup/Popup';
import Language from '@components/Language';
import PerspectiveText from '@components/UI/perspectiveText/PerspectiveText';
import Resize from '@helpers/Resize';
import { IE } from './components/UI/IE/IE';

// Check IE
isIE();

// Edit styles for IE 11
IE.init();

// Event Emitter
const emitter = new EventEmitter();

// Set symbol sprite
SymbolSprite.init('../images/symbol-sprite/symbol-sprite.html', 24);

// Init preloader
const preloader = new Preloader('.preloader', {});
preloader.init();

// Set gradient
Gradient.init('.main');

// Init smooth line
const smoothLine = new SmoothLine({ emitter });
smoothLine.init();

// Init language
const language = new Language({});
language.init(document.getElementById('language'));

// Toggle menu
const menu = new Menu('.header__humbugger');
menu.init();

// Init popup
const popup = new Popup('.popup');
popup.init();

// Init transform effect
PerspectiveText.init(document.querySelector('.main'), document.getElementById('type-text'));

// Init resize
Resize.init(emitter);
