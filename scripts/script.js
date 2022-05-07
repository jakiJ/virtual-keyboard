import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Main from './components/Main.js';
import Keyboard from './components/Keyboard.js';
import ru from './languages/ru.js';
import eng from './languages/eng.js';

const { body } = document;

const keyOrder = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'NumpadSubtract', 'Equal', 'Backspace'],
  ['Tab', 'KeyY', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'NumpadDecimal', 'Period', 'ArrowUp', 'ShiftLeft'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltLeft', 'ControlLeft', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];

// add footer
const footer = new Footer();
body.prepend(footer.elem);

// add main
const main = new Main();
body.prepend(main.elem);

// add header
const header = new Header();
body.prepend(header.elem);

// add keyboard elements

const board = new Keyboard(keyOrder);
board.createTextarea();
board.createKeyboard(ru);

document.querySelector("[data-code='Space']").classList.add('space');
