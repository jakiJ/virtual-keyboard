import createElement from '../utils/createElement.js';

export default class Main {
  constructor() {
    this.template = '<main class="main"></main>';
    this.elem = createElement(this.template);
  }
}
