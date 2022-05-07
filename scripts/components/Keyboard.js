import Key from './Key.js';
import Textarea from './Textarea.js';
import createElement from '../utils/createElement.js';
import languages from '../languages/languages.js';

const userLang = 'eng'; //then I will get language from local storage

export default class Keyboard {
  constructor(rowsKeys) {
    this.allKeys = []; // for events
    this.rowsKeys = rowsKeys;
    this.lang = languages[userLang]
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
    } else if (type.match(/keyup|mouseup/)) {
      currentKey.elem.classList.remove('active-key');
    }
  };
}
