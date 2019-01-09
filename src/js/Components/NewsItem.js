export default class NewsItem {
    constructor(newsObj, newsList) {
        this.newsList = newsList;
        this.id = newsObj.id;
        this.title = newsObj.webTitle;
        this.sectionName = newsObj.sectionName;
        this.publicationDate = this.setDateFormat(newsObj.webPublicationDate);
        this.url = newsObj.webUrl;
        this.htmlElement = this.createElement();
        this.readLaterElement = null;
    }

    setDateFormat(dateString) {
        const newDateString = dateString.substring(0, 10).split("-").reverse().join(".");
        return newDateString;
    }

    createElement() {
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
        `

        const newLi = document.createElement('li');
        newLi.innerHTML = newsElement;
        newLi.querySelector('button').addEventListener('click', () => {
            this.newsList.createReadLaterElement(this);
        });
        return newLi;
    }

}