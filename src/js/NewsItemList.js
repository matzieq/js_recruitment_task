import NewsItem from './NewsItem';


export default class NewsItemList {
    constructor (listSelector, apiKey) {
        this.itemList = [];
        this.readLaterList = [];
        this.apiKey = apiKey;
        this.listElement = document.querySelector(listSelector);
        this.currentPage = 1;
        this.currentSection = "";
    }

    fetchNews(queryStringSection) {
        this.currentSection = queryStringSection;
        let queryStringStart = 'https://content.guardianapis.com/search'
        let queryStringDate = `?from-date=${this.getPreviousMonth()}`;
        let queryStringPage = `&page=${this.currentPage}`;
        let queryStringApiKey = `&api-key=${this.apiKey}`;
        let queryString = queryStringStart + queryStringDate + queryStringSection + queryStringPage + queryStringApiKey;
        console.log(queryString);
        fetch(queryString)
        .then(response => response.json())
        .then(data => {
            console.log(data.response);
            this.listElement.innerHTML = "";
            this.itemList = data.response.results.map(item => new NewsItem(item));
            for (let item of this.itemList) {
                this.listElement.appendChild(item.htmlElement);
            }
        });
    }

    getPreviousMonth() {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        const previousMonth = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
        return previousMonth;
    }
}