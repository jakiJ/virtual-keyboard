import createElement from './createElement.js';

export default class Main {
  constructor() {
    this.template = '<main class="main"></main>';
    this.elem = createElement(this.template);
  }
}
