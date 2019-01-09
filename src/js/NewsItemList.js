import NewsItem from './NewsItem';


export default class NewsItemList {
    constructor (listSelector, apiKey) {
        this.itemList = [];
        this.readLaterList = [];
        this.apiKey = apiKey;
        this.listElement = document.querySelector(listSelector);
        this.currentPageQueryString = "";
        this.currentSectionQueryString = "";
    }

    fetchNews() {
        const queryString = this.buildQueryString();
        console.log(queryString);
        fetch(queryString)
        .then(response => response.json())
        .then(data => {
            console.log(data.response);
            this.renderList(data.response.results);
        });
    }

    getPreviousMonth() {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        const previousMonth = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
        return previousMonth;
    }

    renderList (itemData) {
        this.listElement.innerHTML = "";
        this.itemList = itemData.map(item => new NewsItem(item));
        for (let item of this.itemList) {
            this.listElement.appendChild(item.htmlElement);
        }
    }

    buildQueryString() {
        // this.currentSection = queryStringSection;
        const start = 'https://content.guardianapis.com/search'
        const date = `?from-date=${this.getPreviousMonth()}`;
        const section = this.currentSectionQueryString;
        const page = this.currentPageQueryString;
        const key = `&api-key=${this.apiKey}`;

        return start + date + section + page + key;
    }

    setSection (queryStringSection) {
        this.currentSectionQueryString = queryStringSection;
        this.fetchNews();
    }

    setPage (page) {
        this.currentPage = page;
        this.fetchNews();
    }

    filterNews(queryString, filter) {
        switch (filter) {
            case "section":
                this.currentSectionQueryString = queryString;
                break;
            case "page":
                this.currentPageQueryString = queryString;
                break;
        }
        this.fetchNews();
    }
}
