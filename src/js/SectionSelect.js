export default class SectionSelect {
    constructor(selector, newsList) {
        this.selectorElement = document.querySelector(selector);
        this.newsList = newsList;
        this.getQueryString();
        this.selectorElement.addEventListener('change', () => {
            this.getQueryString();
        });
    }

    getQueryString () {
        let value = this.selectorElement.value.toLowerCase();
        console.log(value);
        // let queryStringArray = [];
        // if (value === 'all') {
        //     const options = this.selectorElement.options;
        //     for (let i = 1; i < options.length; i++) {
        //         queryStringArray.push(options[i].value.toLowerCase());
        //     }
        //     this.queryString = '&section=' + queryStringArray.join('|');
        // } else {
        //     this.queryString = '&section=' + value.toLowerCase();
        // }
        this.queryString = value === 'all' ? '' : `&section=${value}`;
        this.newsList.fetchNews(this.queryString);
    }
}