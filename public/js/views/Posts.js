import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params, paths) {
        super(params, paths);
        this.setTitle("Posts");
    }

    async getHtml() {
        document.querySelector("#app").innerHTML = `
            <br/>
            <p>Click on the below link to view images from each contributors</p>
            <a href="/posts/${this.paths[0]}" class="nav__inlinelink" data-link>${this.paths[0].toUpperCase()}</a>
            <br/>
            <a href="/posts/${this.paths[1]}" class="nav__inlinelink" data-link>${this.paths[1].toUpperCase()}</a>
        `;
    }
}