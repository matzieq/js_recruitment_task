import NewsList from './Components/NewsList';
import SectionSelector from './Components/SectionSelector';
import PageSelector from './Components/PageSelector';
import SearchField from './Components/SearchField';

export default class App {
    constructor(listSelector, readLaterSelector, sectionSelector, pageSelector, apiKey) {    
        this.apiKey = apiKey;
        this.newsList = new NewsList(listSelector, readLaterSelector, apiKey);

        this.pageSelector = new PageSelector(pageSelector, this, () => {
            this.filterNews();
        });

        this.sectionSelector = new SectionSelector(sectionSelector, this, () => {
            this.filterNews();
        });

        this.newsContentSearch = new SearchField('#newsContentSearch', this, () => {
            this.filterNews();
        });

        this.currentPageQueryString = "";
        this.currentSectionQueryString = "";
        this.currentSearchQueryString = "";
        this.totalPageCount = 1;
        this.fetchNews();
    }

    fetchNews() {
        const queryString = this.buildQueryString();
        console.log(queryString);
        fetch(queryString)
            .then(response => response.json())
            .then(data => {
                console.log(this.totalPageCount, data.response.pages);
                if (data.response.pages != this.totalPageCount) {
                    this.totalPageCount = data.response.pages;
                    console.log(this.totalPageCount);
                    this.pageSelector.setPages();
                }
                this.newsList.renderList(data.response.results);
            });
    }

    buildQueryString() {
        // this.currentSection = queryStringSection;
        const start = 'https://content.guardianapis.com/search'
        const date = `?from-date=${this.getPreviousMonth()}`;
        const section = this.sectionSelector.getQueryString();
        const page = this.pageSelector.getQueryString();
        const search = this.newsContentSearch.getQueryString();
        const key = `&api-key=${this.apiKey}`;

        return start + date + section + page + search + key;
    }

    getPreviousMonth() {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        const previousMonth = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
        return previousMonth;
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