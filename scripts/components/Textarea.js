import createElement from '../utils/createElement.js';

export default class Textarea {
  constructor() {
    this.template = `
        <textarea class="display" name="display" id="display" cols="150" rows="10" placeholder="Try me..."></textarea>
        `;
    this.elem = createElement(this.template);
  }
}
