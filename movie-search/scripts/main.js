import Card from './Card.js';
import YandexAPI from './YandexAPI.js';
import OmdbAPI from './OmdbAPI.js';
import mySwiper from './swiper.js';

const mainContent = document.querySelector('.main__content');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__search');
const searchCross = document.querySelector('.search-form__clear');
const loadscreen = document.querySelector('.loadscreen');
const infoBar = document.querySelector('.main__info');
const popup = document.querySelector('.popup');

const card = new Card();
const yandexAPI = new YandexAPI();
const omdbAPI = new OmdbAPI();

// function clearInfoBar() {
//     infoBar.textContent = '';
// }

async function addSlides(movieList) {
    try {
        if (!movieList) throw new Error();
        mySwiper.removeAllSlides();
        popup.style.display = 'none';
        for (let x of movieList) {
            let rating = await omdbAPI.getId(x.imdbID);
            mySwiper.appendSlide(card.createSlide(x.Poster, x.Title, x.Year, rating, x.imdbID));
        }
    } catch {
        infoBar.textContent = `No results for ${searchInput.value}`;
    } finally {
        mySwiper.slideToLoop(0, '1ms');

    }
}

async function startSearch() {

    event.preventDefault();
    infoBar.textContent = '';
    loadscreen.style.top = 0;

    let searchValue = searchInput.value;

    try {
        if (yandexAPI.isRussian(searchValue)) {
            searchValue = await yandexAPI.translateValue(searchValue);
            infoBar.textContent = `Showing results for \'${searchValue}\'`;
        }

        let movieList = await omdbAPI.getList(searchValue);
        let ass = await addSlides(movieList);


    } catch (e) {
        // alert(e.stack)
        infoBar.textContent = `Failed to fetch data, please, try again later`;
        // popup.style.display = 'flex';
        // alert('ОШИБКА')
        // if (e.name === 'TypeError') {
        //     infoBar.textContent = `No results for ${movie}`;
        // }
    } finally {
        loadscreen.style.top = await '-100%'
    }
}

searchForm.onsubmit = startSearch;
searchCross.onclick = function () {
    searchInput.value = '';
    searchInput.focus();
}