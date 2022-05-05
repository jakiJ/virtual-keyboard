import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Main from "./components/Main.js";

const body = document.body;


//add footer
const footer = new Footer();
body.prepend(footer.elem)


//add main
const main = new Main();
body.prepend(main.elem)

//add header
const header = new Header();
body.prepend(header.elem);