import createElement from './createElement.js';

export default class Textarea {
  constructor() {
    this.template = `
        <textarea class="display" name="display" id="display" cols="150" rows="10" placeholder="Try me please..."></textarea>
        `;
    this.elem = createElement(this.template);
  }
}
