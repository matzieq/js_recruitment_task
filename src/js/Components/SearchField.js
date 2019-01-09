import Selector from './Selector';

export default class SearchField extends Selector {
    constructor(selector, appReferece, callback) {
        super(selector, appReferece, 'q', callback);
    }

    getQueryString () {
        const value = this.selectorElement.value.toLowerCase();
        console.log(value, this.filter);
        if (/[^a-zA-Z0-9]/.test(value)) {
            this.selectorElement.value = "";
            this.selectorElement.placeholder = "Only letters and numbers please";
            return '';
        } else {
            const queryString = value ? `&${this.filter}=${value}` : '';
            return queryString;
        }
    }
}