/**
 *  MAIN CONTAINER CLASS
 *  sets everything in motion
 */


import NewsList from './Components/Lists/NewsList';
import SectionSelector from './Components/Inputs/SectionSelector';
import PageSelector from './Components/Inputs/PageSelector';
import SearchField from './Components/Inputs/SearchField';

export default class App {
    constructor(
        listSelector, 
        readLaterSelector,
        sectionSelector, 
        pageSelector, 
        searchFieldSelector, 
        apiKey, 
        availableSections
    ) {    
        this.apiKey = apiKey;

        // the newsList class handles both the search result list and the read later list
        // it accepts CSS selectors for appropriate elements
        this.newsList = new NewsList(listSelector, readLaterSelector);

        // The selector classes accept a CSS selector to get the appropriate element
        // and a callback function which will be called every time the selector is changed
        this.pageSelector = new PageSelector(pageSelector, () => {
            this.fetchNews(false);
        });

        // this also accepts the 'available sections' array, which is used to populate the section
        // selector element
        this.sectionSelector = new SectionSelector(sectionSelector, () => {
            this.fetchNews(true);
        }, availableSections);

        this.newsContentSearch = new SearchField(searchFieldSelector, () => {
            this.fetchNews(true);
        });


        this.fetchNews(true);
    }

    // This is the function which fetches the appropriate content from the API
    // the 'arePagesReset' parameter decides whether the page list must be rebuilt and reset
    // which is always other than when the active page is changed
    fetchNews(arePagesReset) {
        if (arePagesReset) this.pageSelector.resetPages();
        const queryString = this.buildQueryString();
        console.log(queryString);
        fetch(queryString)
            .then(response => response.json())
            .then(data => {
                console.log(this.pageSelector.totalPageCount, data.response.pages);
                if (arePagesReset) {
                    this.pageSelector.setPages(data.response.pages);
                }
                this.newsList.populateList(data.response.results);
            });
    }

    // this function builds the entire query string for the fetchNews function
    // it uses the functions of the selector objects

    buildQueryString() {
        const start = 'https://content.guardianapis.com/search'
        const date = this.getDateQueryString();
        const section = this.sectionSelector.getQueryString();
        const page = this.pageSelector.getQueryString();
        const search = this.newsContentSearch.getQueryString();
        const key = this.getApiKeyQueryString();

        return start + date + section + page + search + key;
    }

    // this just returns the date with month decreased by one, in the format accepted by the API
    getPreviousMonth() {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        const previousMonth = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
        return previousMonth;
    }

    //these are helper functions to clean up the code
    getDateQueryString () {
        return `?from-date=${this.getPreviousMonth()}`;
    }

    getApiKeyQueryString () {
        return `&api-key=${this.apiKey}`;
    }

}