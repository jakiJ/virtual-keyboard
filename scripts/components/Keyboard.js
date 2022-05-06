import Key from "./Key.js";
import Textarea from "./Textarea.js";
import createElement from "./createElement.js";
import ru from '../languages/ru.js';

export default class Keyboard {
    constructor(rowsKeys) {
        this.allKeys = []; //for events
        this.rowsKeys = rowsKeys;
    }

    createTextarea() {
        this.textareaTemplate = new Textarea();
        this.textareaElem = this.textareaTemplate.elem;
        document.querySelector('.main').append(this.textareaElem)
    }

    createKeyboard() {
        this.rowsContainer = createElement('<div class="keyboard-container"></div>');
        this.rowsKeys.forEach(row => {
            this.rowElem = createElement('<div class="keyboard-row"></div>');
            this.rowElem.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`
            row.forEach(key => {
                this.keyData = ru.find(({code}) => code === key)
                this.keyNew = new Key(this.keyData) //создаю класс клавиши
                this.allKeys.push(this.keyNew)
                this.rowElem.append(createElement(this.keyNew.template))
            })
            this.rowsContainer.append(this.rowElem);
        });
        document.querySelector('.main').append(this.rowsContainer)
    }
}