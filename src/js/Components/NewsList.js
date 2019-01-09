/**
 *  This handles both the search result list and the read later list
 * 
 */

import NewsItem from './NewsItem';
import ReadLaterItem from './ReadLaterItem';


export default class NewsList {
    constructor (listSelector, readLaterSelector) {

        //these arrays will be filled with news items and used to map into html lists
        this.itemList = [];
        this.readLaterList = [];

        this.listElement = document.querySelector(listSelector);  
        this.readLaterElement = document.querySelector(readLaterSelector);    
    }

    // this creates NewsItem elements from API data
    populateList (itemData) {
        this.itemList = itemData.map(item => new NewsItem(item, this));
        this.renderList();
    }

    renderList () {
        // reset both HTML lists
        this.listElement.innerHTML = "";
        this.readLaterElement.innerHTML = "";
        
        // display something if either list is empty
        if (!this.readLaterList.length) {
            this.readLaterElement.innerHTML = '<h2 style="color: #888"> The list is empty </h2>'
        }
        if (!this.itemList.length) {
            this.listElement.innerHTML = '<h2 style="color: #888"> No Articles found </h2>';
            return;
        }

        // fill both lists with appropriate items
        for (let item of this.itemList) {
            this.listElement.appendChild(item.htmlElement);
        }
        for (let item of this.readLaterList) {
            this.readLaterElement.appendChild(item.htmlElement);
        }
    }

    // this is a callback for the event listener of the "Read Later" buttons
    createReadLaterElement(newsItem) {

        // first, we check whether the item has already been added to the read later list
        // for this purpose we use the (hopefully unique) id collected from the API 
        for (let item of this.readLaterList) {
            if (item.id === newsItem.id) return;
        }
        
        // next, we create a new read later item, add it to the appropriate array
        // and render the lists to incoproprate the changes
        const newReadLaterItem = new ReadLaterItem(newsItem, this);
        console.log(newReadLaterItem);
        
        this.readLaterList.push(newReadLaterItem);
        this.renderList();
    }
}
