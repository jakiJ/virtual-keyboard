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
                this.keyNew = new Key(this.keyData) //create class key
                this.allKeys.push(this.keyNew)
                const elemKey = this.keyNew.elem;
                this.rowElem.append(elemKey)
            })
            this.rowsContainer.append(this.rowElem);
        });
        document.querySelector('.main').append(this.rowsContainer)

        document.addEventListener('keydown', this.handlerEvent)
        document.addEventListener('keyup', this.handlerEvent)
    }

    handlerEvent = (event) => {
        if (event.stopPropagation) event.stopPropagation();

        const {code, type} = event;
        const currentKey = this.allKeys.find(key => key.code == code)
        if (!currentKey) return;

        this.textareaElem.focus()
        console.log(currentKey)

        if (type.match(/keydown|mousedown/)) {
            if (type.match(/key/)) event.preventDefault();
            currentKey.elem.classList.add('active-key')
            console.log(currentKey.elem)
        } else if (type.match(/keyup|mouseup/)) {
            currentKey.elem.classList.remove('active-key')
        }
    }
}