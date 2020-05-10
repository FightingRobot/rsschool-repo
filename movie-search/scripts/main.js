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

async function addSlides(movieList) {
    try {
        if (!movieList) throw new Error();
        mySwiper.removeAllSlides();
        popup.style.display = 'none';
        for (let x of movieList) {
            let rating = await omdbAPI.getId(x.imdbID);
            if (x.Poster === 'N/A') x.Poster = './assets/noimage.png';
            mySwiper.appendSlide(card.createSlide(x.Poster, x.Title, x.Year, rating, x.imdbID));
        }
    } catch {
        infoBar.textContent = `No results for ${omdbAPI.currentSearchValue}`;
    } finally {
        mySwiper.slideToLoop(0, '1ms');
    }
}

async function startSearch(n = 1, isNewSearch = true) {

    event.preventDefault();
    infoBar.textContent = '';
    loadscreen.style.top = 0;

    if (isNewSearch) {
        omdbAPI.currentSearchValue = searchInput.value;
    }

    // let searchValue = searchInput.value;

    try {
        if (yandexAPI.isRussian(omdbAPI.currentSearchValue)) {
            omdbAPI.currentSearchValue = await yandexAPI.translateValue(omdbAPI.currentSearchValue);
            infoBar.textContent = `Showing results for \'${omdbAPI.currentSearchValue}\'`;
        }

        let movieList = await omdbAPI.getList(omdbAPI.currentSearchValue, n);
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

mySwiper.on('slideChangeTransitionEnd', function () {
    swiperState();
});

function swiperState() {
    if (mySwiper.isEnd) {
        omdbAPI.currentPage += 1;
        startSearch(omdbAPI.currentPage, false);
    }

    if (mySwiper.isBeginning) {
        if (omdbAPI.currentPage > 1) {
            omdbAPI.currentPage -= 1;
            startSearch(omdbAPI.currentPage, false);
        }
    }
}