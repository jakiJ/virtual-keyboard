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

      //shift upper case
      if (this.isShiftDown && !this.isAltDown) this.showShift(this.isShiftDown);

      //print text

      if(this.isShiftDown) {
        this.printText(currentKey, currentKey.shift)
      } else [
        this.printText(currentKey, currentKey.text)
      ]

    } else if (type.match(/keyup|mouseup/)) {
      currentKey.elem.classList.remove('active-key');
      if(code == 'AltLeft') this.isAltDown = false;
      if(code == 'ShiftLeft') this.isShiftDown = false;

      if (!this.isShiftDown) this.showShift(this.isShiftDown);
    }
  };

  switchLang() {
    let newLang = allLang.filter(lang => lang !== userLang)[0];
    setLocalStorage('locLanguage', newLang);
    userLang = getLocalStorage('locLanguage')
    this.lang = languages[userLang]

    this.allKeys.forEach(btn => {
      const keyData = this.lang.find(key => key.code === btn.code);
      btn.elem.children[0].innerHTML = keyData.text
      btn.elem.children[1].innerHTML = keyData.shift

      const {shift, text} = keyData;
      btn.shift = shift;
      btn.text = text;
    })
  }

  showShift(marker) {
    if (marker) {
      this.allKeys.forEach(btn => {
        if (btn.shift) {
          btn.elem.children[0].style.display = 'none';
          btn.elem.children[1].style.display = 'block';
        }
      })
    } else {
      this.allKeys.forEach(btn => {
        if (btn.shift) {
          btn.elem.children[0].style.display = 'block';
          btn.elem.children[1].style.display = 'none';
        }
      })
    }
  }

  printText(current, letter) {
    let cursorPosition = this.textareaElem.selectionStart;
    const textLeft = this.textareaElem.value.slice(0, cursorPosition)
    const textRight = this.textareaElem.value.slice(cursorPosition)

    const functionKey = {
    }

    if(!current.func) {
      this.textareaElem.value = `${textLeft}${letter}${textRight}`
    }
  }
}
