export default class Card {
    constructor() {

    }

    createSlide(poster, title, year, rating, id) {
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
}