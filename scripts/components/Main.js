import createElement from "./createElement.js";
import Textarea from "./Textarea.js";

export default class Main {
    constructor() {
        this.template = `<main class="main"></main>`;
        this.elem = createElement(this.template);

        this.textarea = new Textarea();
        this.elem.append(this.textarea.elem)
    }
}