import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params, paths) {
        super(params, paths);
        this.setTitle("Not Found");
    }

    async getHtml() {
        document.querySelector("#app").innerHTML = `
            <h1>Not Fount</h1>
            <p>Go back to home page!</p>
            <a href="/" class="nav__inlinelink" data-link>Home</a>
        `;
    }
}