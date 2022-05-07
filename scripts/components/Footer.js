import createElement from './createElement.js';

export default class Footer {
  constructor() {
    this.template = `
        <footer class="footer">
            <a href="https://github.com/jakiJ">gitHub</a>
            <a href="https://rs.school/js/">
                <div class="logo-rss"></div>
            </a>
        </footer>
        `;
    this.elem = createElement(this.template);
  }
}
