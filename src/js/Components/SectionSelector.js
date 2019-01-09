import Selector from './Selector';

export default class SectionSelector extends Selector {
    constructor (selector, newsList, callback) {
        super(selector, newsList, 'section', callback);

    }
    getQueryString () {
        const value = this.selectorElement.value.toLowerCase();
        console.log(value, this.filter);
        const queryString = value === 'all' ? '' : `&${this.filter}=${value}`;
        return queryString;
    }
}