import './styles/main.css';
import App from './js/App';
import availableSections from './js/Components/Data/availableSections';

const apiKey = '7b7ccdf5-674e-4c27-bc96-d76275ee13eb';


const app = new App(
    '.newsList', 
    '.readLaterList', 
    '#sectionSelect', 
    '#activePageSelect', 
    '#newsContentSearch', 
    apiKey,
    availableSections
);


// Please use https://open-platform.theguardian.com/documentation/
