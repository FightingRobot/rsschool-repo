const mainContent = document.querySelector('.main__content');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__search');

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

async function addSlides() {
    mySwiper.removeAllSlides();

    let movie = getValue();
    let movieList = await getList(movie);

    movieList.forEach(async x => {
        let rating = await getId(x.imdbID);
        mySwiper.appendSlide(createSlide(x.Poster, x.Title, x.Year, rating, x.imdbID));
    });
}

function getValue() {
    event.preventDefault();
    return searchInput.value
}

searchForm.onsubmit = addSlides;