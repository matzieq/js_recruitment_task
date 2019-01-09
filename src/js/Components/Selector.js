export default class Selector {
    constructor(selector, appReference, filter, callback) {
        this.selectorElement = document.querySelector(selector);
        this.appReference = appReference;
        this.filter = filter;
        this.callback = callback;
        this.getQueryString();
        this.setListener();
    }

    getQueryString () {
        const value = this.selectorElement.value.toLowerCase();
        console.log(value, this.filter);
        const queryString = value === 'all' ? '' : `&${this.filter}=${value}`;
        return queryString;
    }

    setListener () {
        this.selectorElement.addEventListener('change', () => {
            this.getQueryString();
            this.callback();
        });
    }
}