const mainContent = document.querySelector('.main__content');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__search');
const searchCross = document.querySelector('.search-form__clear');
const loadscreen = document.querySelector('.loadscreen');
const infoBar = document.querySelector('.main__info');

var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 20,

    pagination: {
        el: '.swiper-pagination',
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})


async function getList(movie) {
    let responce = await fetch(`http://www.omdbapi.com/?s=${movie}&apikey=999d8d5b`);
    let json = await responce.json();
    return json.Search

}

function createSlide(poster, title, year, rating, id) {
    const card = document.createElement('div');
    card.classList.add('swiper-slide');

    const cardTitle = document.createElement('a');
    cardTitle.classList.add('swiper-slide__title');
    cardTitle.textContent = title;
    cardTitle.setAttribute('href', `https://www.imdb.com/title/${id}/videogallery/`);

    const cardPoster = document.createElement('div');
    cardPoster.classList.add('swiper-slide__poster');

    const cardimg = document.createElement('img');
    cardimg.setAttribute('src', poster)
    cardPoster.append(cardimg);

    const cardYear = document.createElement('div');
    cardYear.classList.add('swiper-slide__year');
    cardYear.textContent = year;

    const cardRating = document.createElement('div');
    cardRating.classList.add('swiper-slide__rating');
    cardRating.textContent = rating;

    card.append(cardTitle);
    card.append(cardPoster);
    card.append(cardYear);
    card.append(cardRating);

    return card
}

async function getId(movie) {
    let imdbid = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=999d8d5b`);
    let json = await imdbid.json();
    return json.imdbRating
}

async function addSlides(movieList) {
    try {
        for (let x of movieList) {
            let rating = await getId(x.imdbID);
            mySwiper.appendSlide(createSlide(x.Poster, x.Title, x.Year, rating, x.imdbID));
        }
    } finally {
        mySwiper.slideToLoop(0, '1ms');
        loadscreen.style.top = await '-100%'
    }

}

async function startSearch() {
    let searchValue = searchInput.value;
    mySwiper.removeAllSlides();
    loadscreen.style.top = 0;

    try {


        let movie = await getValue();

        let movieList = await getList(movie);
        let ass = await addSlides(movieList);

    } catch (e) {
        infoBar.textContent = `No results for ${searchInput.value}`;
        // alert('ОШИБКА')
        // if (e.name === 'TypeError') {
        //     infoBar.textContent = `No results for ${movie}`;
        // }
    }
}

async function getValue() {
    event.preventDefault();
    let startingValue = searchInput.value;

    if (isRussian(startingValue)) {
        let translatedValue = await translateValue(startingValue);
        infoBar.textContent = `Showing results for \'${translatedValue}\'`;
        return translatedValue;
    }

    return startingValue
}

function isRussian(value) {
    return /[а-я]/i.test(value);
}

async function translateValue(value) {
    let responce = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200509T182415Z.28d28ce3d1a7efd0.f489f83dd586544c20787a511bba0b474352d4b1&text=${value}&lang=ru-en`);
    let json = await responce.json();
    return json.text
}

searchForm.onsubmit = startSearch;
searchCross.onclick = function () {
    searchInput.value = '';
    searchInput.focus();
}