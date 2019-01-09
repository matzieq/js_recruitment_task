import NewsItem from './NewsItem';


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
            this.readLaterElement.appendChild(item);
        }
    }

    
    createReadLaterElement(newsItem) {
        for (let item of this.readLaterList) {
            if (item.id === newsItem.id) return;
        }
        const readLaterElement = `
            <h4 class="readLaterItem-title">${newsItem.title}</h4>
            <section>
                <a href="${newsItem.url}" target= "_blank" class="button button-clear">Read</a>
                <button class="button button-clear">Remove</button>
            </section>      
        `;

        const newLi = document.createElement('li');
        newLi.innerHTML = readLaterElement;
        newLi.id = newsItem.id;
        console.log(newLi);
        newLi.querySelector('button').addEventListener('click', () => {
            newLi.remove();
            this.readLaterList = this.readLaterList.filter(element => element.id !== newLi.id);
            this.renderList();
        });
        this.readLaterList.push(newLi);
        this.renderList();
    }
}
