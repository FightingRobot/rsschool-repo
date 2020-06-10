import vocabulary from './vocabulary.js';
import Geocode from './GeocodingAPI.js';
import Clock from './Clock.js';
import Weather from './WeatherAPI.js';
import Unsplash from './UnsplashAPI.js';
import YandexAPI from './YandexAPI.js';
import selectors from './Selectors.js';

// class Controller {
//   constructor() {

//   }


// }

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

btnStart.onclick = menuNavigation.gameStart.bind(menuNavigation);