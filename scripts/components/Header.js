import createElement from '../utils/createElement.js';

export default class Header {
  constructor() {
    this.template = `
        <header class="header">
            <h1>VIRTUAL KEYBOARD <span>for windows</span></h1>
            <p>Switch language: Shift + Alt</p>
        </header>
        `;
    this.elem = createElement(this.template);
  }
}
