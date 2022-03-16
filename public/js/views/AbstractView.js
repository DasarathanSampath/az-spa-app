export default class {
    constructor(params, paths) {
        this.params = params;
        this.paths = paths;
    }

    setTitle(title) {
        document.title = title;
    }

    getHtml() {
        return "";
    }
}