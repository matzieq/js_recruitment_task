/**
 * This class is used to create elements for the search result list
 */

export default class NewsItem {
    constructor(newsObj, newsList) {

        // these are taken straight from the API
        this.id = newsObj.id;
        this.title = newsObj.webTitle;
        this.sectionName = newsObj.sectionName;
        this.url = newsObj.webUrl;

        this.publicationDate = this.setDateFormat(newsObj.webPublicationDate);

        // this holds the HTML list element
        // it needs the reference to the parent element to attach approriate callbacks to buttons
        this.htmlElement = this.createElement(newsList);
        
    }

    // the date in the API contains also the time, we need to trim it and display it in
    // the appropriate format;
    setDateFormat(dateString) {
        const newDateString = dateString.substring(0, 10).split("-").reverse().join(".");
        return newDateString;
    }


    
    createElement(newsList) {

        // first, we make the template
        const newsElement = `
            <article class="news">
                <header>
                    <h3>${this.title}</h3>
                </header>
                <section class="newsDetails">
                    <ul>
                        <li><strong>Section Name:</strong> ${this.sectionName}</li>
                        <li><strong>Publication Date:</strong> ${this.publicationDate}</li>
                    </ul>
                </section>
                <section class="newsActions">
                    <a href="${this.url}" target="_blank" class="button">Full article</a>
                    <button class="button button-outline">Read Later</button>
                </section>
            </article>
        `;
        // then we insert the template to the new list element
        const newLi = document.createElement('li');
        newLi.innerHTML = newsElement;

        // finally, we add a callback to the button
        newLi.querySelector('button').addEventListener('click', () => {
            newsList.createReadLaterElement(this);
        });
        
        return newLi;
    }

}