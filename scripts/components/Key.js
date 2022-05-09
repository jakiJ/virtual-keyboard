import createElement from '../utils/createElement.js';

export default class Key {
  constructor({text, shift, code, func}) {
    this.text = text;
    this.shift = shift || '';
    this.code = code;
    this.func = func;

    this.template = `
        <div class="keyBtn ${this.func ? 'func-keyBtn' : ''}" data-code="${this.code}">
            <p class="no-shift-key">${this.text}</p>
            <p class="shift-key visible">${this.shift ? this.shift : this.text}</p>
        </div>
        `;

    this.elem = createElement(this.template);
  }
}
