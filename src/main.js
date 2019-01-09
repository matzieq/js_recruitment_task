import './styles/main.css';
import NewsItemList from './js/NewsItemList';
import SectionSelect from './js/SectionSelect';

const apiKey = '7b7ccdf5-674e-4c27-bc96-d76275ee13eb';

const newsItemList = new NewsItemList('.newsList', apiKey);
const sectionSelect = new SectionSelect('#sectionSelect', newsItemList);


// Please use https://open-platform.theguardian.com/documentation/
