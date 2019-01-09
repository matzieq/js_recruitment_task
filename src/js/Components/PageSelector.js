/**
 * This handles the active page select element
 */

import Selector from './Selector';

export default class PageSelector extends Selector {
    constructor (selector, callback) {
        super(selector, callback);

        // this holds the number of options to be displayed
        this.totalPageCount = 1;
    }

    // this needs to check if there is any value at all
    // if not, there is no query string
    // this happens if no results match the filter parameters
    getQueryString () {
        const value = this.selectorElement.value;
        console.log(value);
        const queryString = value ? `&page=${value}` : '';
        return queryString;
    }

    // this is used to specify new page count and populate the select element with options
    setPages (newPageCount) {
        this.totalPageCount = newPageCount;
        this.selectorElement.innerHTML = "";
        for (let i = 1; i <= this.totalPageCount; i++) {
            const newOption = document.createElement("option");
            newOption.value = i;
            newOption.innerText = i;
            this.selectorElement.appendChild(newOption);
        }
        this.resetPages();
    }

    // this is needed because we need to reset the query string each time a new filter is applied
    // otherwise the API throws temper tantrums
    resetPages () {
        this.selectorElement.value = 1;
    }

}