import AbstractView from "./AbstractView.js";

const getAllPosts = async () => {
    const base = 'https://jsexfun-7742.azurewebsites.net/api/items?code=YZf829GLXBUqckEzTF9km6gJuCicXh5LK4CPPoJnub5o13k7mSFlVw==';
    const response = await fetch(base);
    const data = await response.json();
    return data;
}

export default class extends AbstractView {
    constructor(params, paths) {
        super(params, paths);        
        this.setTitle(this.params["id"]);
    }
    async getHtml() {
        const data = await getAllPosts();
        const newArray = data.filter( el => {
            return el.cname === this.params["id"];
        });
        document.querySelector("#app").innerHTML = `
            <p>Page from ${this.params["id"]} </p>
            <ul class="data">
                ${newArray.map(each => `<li><b>${each.subject}</b> <br/> <p>${each.content}</p></li>
            `).join("")}
            </ul>
        `;
    }
}