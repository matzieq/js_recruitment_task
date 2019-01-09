/**
 *  This is a template for other selector classes
 */

export default class Selector {
    constructor(selector, callback) {

        // all it does is add a listener to the 'change' event and attach the passed callback
        this.selectorElement = document.querySelector(selector);
        this.callback = callback;
        this.setListener();
    }

    // this method returns the query string fragment based on the value entered / selected
    // it is very generic and is overridden in derived classes
    getQueryString () {
        const value = this.selectorElement.value.toLowerCase();
        const queryString = value ? `&${this.filter}=${value}` : '';
        return queryString;
    }

    setListener () {
        this.selectorElement.addEventListener('change', () => {
            this.callback();
        });
    }
}