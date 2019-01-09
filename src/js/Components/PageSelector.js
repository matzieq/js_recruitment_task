import Selector from './Selector';

export default class PageSelector extends Selector {
    constructor(selector, appReference, callback) {
        super(selector, appReference, 'page', callback);
        // this.setPages();
    }
    
    getQueryString () {
        const value = this.selectorElement.value.toLowerCase();
        console.log(value, this.filter);
        const queryString = value ? `&${this.filter}=${value}` : '';
        return queryString;
    }

    setPages () {
        this.selectorElement.innerHTML = "";
        for (let i = 1; i <= this.appReference.totalPageCount; i++) {
            const newOption = document.createElement("option");
            newOption.value = i;
            newOption.innerText = i;
            this.selectorElement.appendChild(newOption);
        }
        this.selectorElement.value = 1;
    }

}