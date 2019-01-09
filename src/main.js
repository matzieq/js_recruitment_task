import './styles/main.css';
import NewsItemList from './js/NewsItemList';
import selector from './js/Selector';


const apiKey = '7b7ccdf5-674e-4c27-bc96-d76275ee13eb';

const newsList = new NewsItemList('.newsList', apiKey);
const sectionSelect = new selector('#sectionSelect', newsList, 'section');
const pageSelect = new selector('#activePageSelect', newsList, 'page');


// Please use https://open-platform.theguardian.com/documentation/
