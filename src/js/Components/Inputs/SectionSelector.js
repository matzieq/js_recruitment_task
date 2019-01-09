/**
 *  This handles the section select element
 */

import Selector from './Selector';

export default class SectionSelector extends Selector {
    constructor (selector, callback, apiKey) {
        super(selector, callback);
        this.buildMenu(apiKey);
    }

    // this checks if the 'all' option has been selected,
    // if so - then it doesnt provide any filters
    // otherwise it creates a query string fragment based on the option value
    getQueryString () {
        const value = this.selectorElement.value.toLowerCase();
        console.log(value);
        const queryString = value === 'all' ? '' : `&section=${value}`;
        return queryString;
    }

    // this rebuilds all the options based on data fetched from the API
    buildMenu(apiKey) {
        this.selectorElement.innerHTML = "";

        // the first option is always the 'all' option
        const optionAll = document.createElement('option');
        optionAll.value = 'All';
        optionAll.innerText = 'All';
        this.selectorElement.appendChild(optionAll);
        fetch(`https://content.guardianapis.com/sections?api-key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for (let section of data.response.results) {
                    const newOption = document.createElement('option');
                    newOption.value = section.id;
                    // newOption.innerText = this.capitalizeFirstLetter(section);
                    newOption.innerText = section.webTitle;
                    this.selectorElement.appendChild(newOption);
                }
            })
        // the rest are then appended based on the array
    }


    // a helper function to capitalize option descriptions
    capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
