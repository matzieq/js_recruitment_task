import Selector from './Selector';

export default class SectionSelector extends Selector {
    constructor (selector, newsList, callback) {
        super(selector, newsList, 'section', callback);

    }

}