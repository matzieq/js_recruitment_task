/**
 *  This is a class used to create elements for the read later list
 */

export default class ReadLaterItem {
    constructor(newsItem, newsList) {
        // the id is needed to make sure if there are no duplicates in the read later list
        this.id = newsItem.id;


        this.htmlElement = this.createElement(newsItem, newsList);
    }

    createElement (newsItem, newsList) {

        // first, we create the template
        const readLaterElement = `
            <h4 class="readLaterItem-title">${newsItem.title}</h4>
            <section>
                <a href="${newsItem.url}" target= "_blank" class="button button-clear">Read</a>
                <button class="button button-clear">Remove</button>
            </section>      
        `;

        // then we insert the template into a new list element
        const newLi = document.createElement('li');
        newLi.innerHTML = readLaterElement;

        // finally, we attach a listener to the remove button
        newLi.querySelector('button').addEventListener('click', () => {
            // removing from HTML is simple enough
            newLi.remove();

            // but to remove it from the array we use filter to find matching id and delete it
            newsList.readLaterList = newsList.readLaterList
                .filter(element => element.id !== this.id);
            console.log(newsList.readLaterList);

            // and then we render the list
            newsList.renderReadLaterList();
        });

        return newLi;

    }

}