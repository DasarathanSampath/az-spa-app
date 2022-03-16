import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params, paths) {
        super(params, paths);
        this.setTitle("Home");
        document.body.addEventListener("click", e => {
            if (e.target.matches("[form-submit-event]")) {
                document.getElementById('login').addEventListener('submit', (event) => {
                    event.preventDefault()
                    // this.addMeal({
                    //   id: Date.now(), // faux id
                    //   title: document.getElementById('title').value,
                    //   calories: parseInt(document.getElementById('calories').value)
                    // })
                })
            }
        });
    }

    async getHtml() {
        document.querySelector("#app").innerHTML = `
            <div class="center">
            <h3>Log In</h3>
            <form id="login">
                <label>User Email</label>
                <input type="email" id="useremail" placeholder="Registered email"/>
                <div class="feedback" id="feedbackemail"></div>
                <label>Password</label>
                <input type="password" id="password" placeholder="Enter a valid password"/>
                <div class="feedback" id="feedbackpassword"></div>
                <button type="submit" style="margin-top: 2em;"id="submit" form-submit-event>Submit</button>
            </form>
        </div>
        `;
    }    
}
