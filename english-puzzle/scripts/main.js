import vocabulary from './vocabulary.js';
import Geocode from './GeocodingAPI.js';
import Clock from './Clock.js';
import Weather from './WeatherAPI.js';
import Unsplash from './UnsplashAPI.js';
import YandexAPI from './YandexAPI.js';
import book1 from '../assets/vocabulary/data/book1.js';

class Controller {
  constructor() {
    this.book1 = book1;
    this.sentence = document.querySelector('.game-screen__sentence');
    this.pieces = document.querySelector('.game-screen__puzzle-pieces');

    this.currentSentence = 0;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  createSentence() {
    this.sentence.innerHTML = this.book1[this.currentSentence].textExampleTranslate;
  }

  createTranslation() {
    let engSentence = this.book1[this.currentSentence].textExample.split(' ');
    this.shuffle(engSentence)

    for (let word of engSentence) {
      let newElem = document.createElement('div');
      newElem.classList.add('puzzle-piece');
      newElem.innerHTML = word;
      this.pieces.append(newElem);
    }
  }

  start() {
    this.createSentence();
    this.createTranslation();
  }
}

const btnStart = document.querySelector('.btn__start');

class MenuNavigation {
  constructor() {
    this.startScreen = document.querySelector('.start-screen');
    this.gameScreen = document.querySelector('.game-screen');
  }

  gameStart() {
    this.startScreen.classList.remove('start-screen_active');
    this.gameScreen.classList.add('game-screen_active');
  }
}

const menuNavigation = new MenuNavigation();
const controller = new Controller();

controller.start();

btnStart.onclick = menuNavigation.gameStart.bind(menuNavigation);