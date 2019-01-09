/**
 *  This handles both the search result list and the read later list
 * 
 */

import NewsItem from './NewsItem';
import ReadLaterItem from './ReadLaterItem';


export default class NewsList {
    constructor (listSelector, readLaterSelector) {

        //these arrays will be filled with news items and used to map into html lists
        this.newsItemList = [];
        this.readLaterList = [];

        this.newsListElement = document.querySelector(listSelector);  
        this.readLaterElement = document.querySelector(readLaterSelector);

        // the initial render call simply clears and prepares both lists
        this.render();    
    }

    // this creates NewsItem elements from API data
    populateList (itemData) {
        this.newsItemList = itemData.map(item => new NewsItem(item, this));
        // this.renderList(this.itemList, this.newsListElement);
        this.renderNewsItemList();
    }

    render () {
        this.renderNewsItemList();
        this.renderReadLaterList(); 
    }

    renderList (array, htmlElement, message) {
        console.log(array);
        // display something if either list is empty
        if (!array.length) {
            htmlElement.innerHTML = `<h2 style="color: #888"> ${message}</h2>`;
            return;
        }
        
        // reset  HTML list
        htmlElement.innerHTML = "";
        // fill list with appropriate items
        for (let item of array) {
            htmlElement.appendChild(item.htmlElement);
        }
        
    }

    renderNewsItemList () {
        this.renderList(this.newsItemList, this.newsListElement, 'No articles found');
    }

    renderReadLaterList () {
        this.renderList(this.readLaterList, this.readLaterElement, 'The list is empty');
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
        this.renderReadLaterList();
    }
}
