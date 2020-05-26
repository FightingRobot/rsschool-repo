import Card from './Card.js';
import YandexAPI from './YandexAPI.js';
import OmdbAPI from './OmdbAPI.js';
import Keyboard from './Keyboard.js';
import mySwiper from './swiper.js';

const card = new Card();
const yandexAPI = new YandexAPI();
const omdbAPI = new OmdbAPI();
const keyboard = new Keyboard();

keyboard.initializeKeyboard(keyboard.keyboardStateController().lowerCase);

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__search');
const searchCross = document.querySelector('.search-form__clear');
const loadscreen = document.querySelector('.loadscreen');
const infoBar = document.querySelector('.main__info');
const popup = document.querySelector('.popup');
const searchKeyboard = document.querySelector('.search-form__openkeyboard');
const keyboardBody = document.querySelector('.keyboard');

async function addSlides(movieList) {
  try {
    if (!movieList) throw new Error();
    mySwiper.removeAllSlides();
    popup.style.display = 'none';

    for (const x of movieList) {
      const fullInfo = await omdbAPI.getFullInfoById(x.imdbID);
      const rating = await fullInfo.imdbRating;
      const plot = await fullInfo.Plot;

      if (x.Poster === 'N/A') x.Poster = './assets/noimage.jpg';

      const newCard = card.createSlide(x.Poster, x.Title, x.Year, rating, x.imdbID, plot);
      newCard.onclick = function () {
        newCard.querySelector('.swiper-slide__plot').classList.toggle('swiper-slide__plot_active');
      };

      mySwiper.appendSlide(newCard);
    }
  } catch {
    infoBar.textContent = `No results for '${omdbAPI.currentSearchValue}'`;
  } finally {
    mySwiper.slideToLoop(0, '1ms');
  }
}

async function startSearch(n = 1, isNewSearch = true) {
  event.preventDefault();
  keyboardBody.classList.remove('keyboard_active');
  infoBar.textContent = '';
  loadscreen.style.top = 0;

  if (isNewSearch) {
    omdbAPI.currentSearchValue = searchInput.value;
  }

  try {
    if (yandexAPI.isRussian(omdbAPI.currentSearchValue)) {
      omdbAPI.currentSearchValue = await yandexAPI.translateValue(omdbAPI.currentSearchValue);
      infoBar.textContent = `Showing results for '${omdbAPI.currentSearchValue}'`;
    }

    const movieList = await omdbAPI.getList(omdbAPI.currentSearchValue, n);
    const ass = await addSlides(movieList);
    mySwiper.init();
  } catch (e) {
    infoBar.textContent = 'Failed to fetch data, please, try again later';
  } finally {
    loadscreen.style.top = await '-100%';
  }
}

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

searchForm.onsubmit = startSearch;
searchCross.onclick = function () {
  searchInput.value = '';
  searchInput.focus();
};
searchKeyboard.onclick = function () {
  keyboardBody.classList.toggle('keyboard_active');
};

mySwiper.on('slideChangeTransitionEnd', () => {
  swiperState();
});
