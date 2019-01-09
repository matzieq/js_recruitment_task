import Selector from './Selector';

export default class SearchField extends Selector {
    constructor(selector, appReferece, callback) {
        super(selector, appReferece, 'q', callback);
    }
}