/**
 *  This handles the section select element
 */

import Selector from './Selector';

export default class SectionSelector extends Selector {
    constructor (selector, callback, availableSections) {
        super(selector, callback);
        this.buildMenu(availableSections);
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

    // this rebuilds all the options based on the passed array of strings
    buildMenu(availableSections) {
        this.selectorElement.innerHTML = "";

        // the first option is always the 'all' option
        const optionAll = document.createElement('option');
        optionAll.value = 'All';
        optionAll.innerText = 'All';
        this.selectorElement.appendChild(optionAll);

        // the rest are then appended based on the array
        for (let section of availableSections) {
            const newOption = document.createElement('option');
            newOption.value = section;
            newOption.innerText = this.capitalizeFirstLetter(section);
            this.selectorElement.appendChild(newOption);
        }
    }


    // a helper function to capitalize option descriptions
    capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
