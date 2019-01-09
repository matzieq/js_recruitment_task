/**
 *  This handles the search field
 */

import Selector from './Selector';

export default class SearchField extends Selector {
    
    getQueryString () {
        const value = this.selectorElement.value.toLowerCase();

        // in addition to the usual we must validate the input, because the query string
        // must not contain non-alphanumeric characters
        // we use a regular expression to check for that
        // and display an appropriate message if the requirements are not met
        if (/[^a-zA-Z0-9]/.test(value)) {
            this.selectorElement.value = "";
            this.selectorElement.placeholder = "Only letters and numbers please";
            return '';
        } else {
            const queryString = value ? `&q=${value}` : '';
            return queryString;
        }
    }
}