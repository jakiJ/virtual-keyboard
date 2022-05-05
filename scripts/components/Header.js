import createElement from "./createElement.js";

export default class Header {
    constructor() {
        this.template = `
        <header class="header">
            <h1>VIRTUAL KEYBOARD <span>for windows</span></h1>
        </header>
        `;
        this.elem = createElement(this.template);
    }
}