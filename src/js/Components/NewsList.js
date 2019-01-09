import NewsItem from './NewsItem';
import ReadLaterItem from './ReadLaterItem';


export default class NewsList {
    constructor (listSelector, readLaterSelector, apiKey) {
        this.itemList = [];
        this.readLaterList = [];
        this.apiKey = apiKey;
        this.listElement = document.querySelector(listSelector);  
        this.readLaterElement = document.querySelector(readLaterSelector);    
    }


    populateList (itemData) {
        
        this.itemList = itemData.map(item => new NewsItem(item, this));
        this.renderList();
    }

    renderList () {
        this.listElement.innerHTML = "";
        this.readLaterElement.innerHTML = "";
        console.log(this.readLaterList);
        if (!this.readLaterList.length) {
            this.readLaterElement.innerHTML = '<h2 style="color: #888"> The list is empty </h2>'
        }
        if (!this.itemList.length) {
            this.listElement.innerHTML = '<h2 style="color: #888"> No Articles found </h2>';
            return;
        }

        
        for (let item of this.itemList) {
            this.listElement.appendChild(item.htmlElement);
        }
        for (let item of this.readLaterList) {
            this.readLaterElement.appendChild(item.htmlElement);
        }
    }

    
    createReadLaterElement(newsItem) {
        for (let item of this.readLaterList) {
            if (item.id === newsItem.id) return;
        }
        
        const newReadLaterItem = new ReadLaterItem(newsItem, this);
        console.log(newReadLaterItem);
        
        this.readLaterList.push(newReadLaterItem);
        this.renderList();
    }
}
