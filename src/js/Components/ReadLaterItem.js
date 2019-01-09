export default class ReadLaterItem {
    constructor(newsItem, newsList) {
        this.newsList = newsList;
        this.id = newsItem.id;
        this.htmlElement = this.createElement(newsItem);
    }

    createElement (newsItem) {
        const readLaterElement = `
            <h4 class="readLaterItem-title">${newsItem.title}</h4>
            <section>
                <a href="${newsItem.url}" target= "_blank" class="button button-clear">Read</a>
                <button class="button button-clear">Remove</button>
            </section>      
        `;
        const newLi = document.createElement('li');
        newLi.innerHTML = readLaterElement;

        newLi.querySelector('button').addEventListener('click', () => {
            console.log(newLi, this.newsList.readLaterList);
            newLi.remove();
            this.newsList.readLaterList = this.newsList.readLaterList
                .filter(element => element.id !== this.id);
            console.log(this.newsList.readLaterList);
            this.newsList.renderList();
        });
        return newLi;

    }

}