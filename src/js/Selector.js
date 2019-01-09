export default class SectionSelect {
    constructor(selector, newsList, filter) {
        this.selectorElement = document.querySelector(selector);
        this.newsList = newsList;
        this.filter = filter;
        this.getQueryString();
        this.selectorElement.addEventListener('change', () => {
            this.getQueryString();
        });
    }

    getQueryString () {
        const value = this.selectorElement.value.toLowerCase();
        console.log(value, this.filter);
        const queryString = value === 'all' ? '' : `&${this.filter}=${value}`;
        this.newsList.filterNews(queryString, this.filter);
    }
}