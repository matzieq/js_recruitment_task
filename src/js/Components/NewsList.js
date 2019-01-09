import NewsItem from './NewsItem';


export default class NewsList {
    constructor (listSelector, readLaterSelector, apiKey) {
        this.itemList = [];
        this.readLaterList = [];
        this.apiKey = apiKey;
        this.listElement = document.querySelector(listSelector);  
        this.readLaterElement = document.querySelector(readLaterSelector);    
    }


    renderList (itemData) {
        this.listElement.innerHTML = "";
        if (itemData.length === 0) {
            this.listElement.innerHTML = `<h2 style="color: #888"> No Articles found </h2>`;
            return;
        }
        this.itemList = itemData.map(item => new NewsItem(item));
        for (let item of this.itemList) {
            this.listElement.appendChild(item.htmlElement);
        }
    }
}
