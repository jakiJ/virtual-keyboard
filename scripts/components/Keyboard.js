import Key from './Key.js';
import Textarea from './Textarea.js';
import createElement from '../utils/createElement.js';
import languages from '../languages/languages.js';
import {getLocalStorage, setLocalStorage} from '../utils/localStorage.js';

let userLang = getLocalStorage('locLanguage')
const allLang = Object.keys(languages);

export default class Keyboard {
  constructor(rowsKeys) {
    this.allKeys = []; // for events
    this.rowsKeys = rowsKeys;
    this.lang = languages[userLang]

    //controllers keys
    this.isShiftDown = false;
    this.isAltDown = false;
    this.isCapsDown = false;
  }

  createTextarea() {
    this.textareaTemplate = new Textarea();
    this.textareaElem = this.textareaTemplate.elem;
    document.querySelector('.main').append(this.textareaElem);
  }

  createKeyboard() {
    this.rowsContainer = createElement('<div class="keyboard-container"></div>');
    this.rowsKeys.forEach((row) => {
      this.rowElem = createElement('<div class="keyboard-row"></div>');
      this.rowElem.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
      row.forEach((key) => {
        this.keyData = this.lang.find(({ code }) => code === key);
        this.keyNew = new Key(this.keyData); // create class key
        this.allKeys.push(this.keyNew);
        const elemKey = this.keyNew.elem;
        this.rowElem.append(elemKey);
      });
      this.rowsContainer.append(this.rowElem);
    });
    document.querySelector('.main').append(this.rowsContainer);

    document.addEventListener('keydown', this.handlerEvent);
    document.addEventListener('keyup', this.handlerEvent);
    console.log(this.allKeys)
  }

  handlerEvent = (event) => {
    if (event.stopPropagation) event.stopPropagation();

    const { code, type } = event;
    const currentKey = this.allKeys.find((key) => key.code == code);
    if (!currentKey) return;

    this.textareaElem.focus();

    if (type.match(/keydown|mousedown/)) {
      if (type.match(/key/)) event.preventDefault();
      currentKey.elem.classList.add('active-key');

      if(code == 'AltLeft') this.isAltDown = true;
      if(code == 'ShiftLeft') this.isShiftDown = true;

      if(this.isAltDown && this.isShiftDown) this.switchLang();

    } else if (type.match(/keyup|mouseup/)) {
      currentKey.elem.classList.remove('active-key');
      if(code == 'AltLeft') this.isAltDown = false;
      if(code == 'ShiftLeft') this.isShiftDown = false;
    }
  };

  switchLang() {
    let newLang = allLang.filter(lang => lang !== userLang)[0];
    setLocalStorage('locLanguage', newLang);
    userLang = getLocalStorage('locLanguage')
    this.lang = languages[userLang]


    this.allKeys.forEach(btn => {
      let {shift, text} = btn;
      const {newShift, newText} = this.lang.find(key => key.code === btn.code);
      shift = newShift;
      text = newText;
      console.log(btn.elem.innerHTML["no-shift-key"]) //not work
    })
  }
}
