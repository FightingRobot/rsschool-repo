import IpinfoAPI from './IpinfoAPI.js';
import Geocode from './GeocodingAPI.js';
import Clock from './Clock.js';
import Weather from './WeatherAPI.js';
import Unsplash from './UnsplashAPI.js';
import YandexAPI from './YandexAPI.js';
import selectors from './Selectors.js';

const latitude = document.querySelector('.latitude');
const longitude = document.querySelector('.longitude');
const placeSelector = document.querySelector('.temp-info__country');
const timeSelector = document.querySelector('#time');

const searchFormSend = document.querySelector('.search-form__send');
const searchFormInput = document.querySelector('.search-form__input');
const refreshButton = document.querySelector('.btn__pic');
const btnSwitch = document.querySelector('.btn__tempscale');

const btnEngLang = document.querySelector('#engLang');
const btnRuLang = document.querySelector('#ruLang');
const btnBeLang = document.querySelector('#beLang');

const tempNow = document.querySelector('.temp-info__temp-now');
const state = document.querySelector('#state');
const tempImgNow = document.querySelector('.temp-info__img-now');
const feelsLikeNow = document.querySelector('.temp-info__feels-like_now');
const windNow = document.querySelector('.temp-info__wind-speed_now');
const humidityNow = document.querySelector('.temp-info__humidity_now');

const tempDays = document.querySelectorAll('.temp-info__temp');
const iconDays = document.querySelectorAll('.temp-info__img');
const load = document.querySelector('.loadscreen');

const translateSelectors = {
  day0: document.querySelector('#day0'),
  day1: document.querySelector('#day1'),
  day2: document.querySelector('#day2'),
  day3: document.querySelector('#day3'),
  month: document.querySelector('#month'),
  lat: document.querySelector('#lat'),
  lng: document.querySelector('#lng'),
  state: document.querySelector('#state'),
  feels: document.querySelector('#feels'),
  wind: document.querySelector('#wind'),
  humid: document.querySelector('#humid'),
  country: document.querySelector('.temp-info__country'),
  searchButton: document.querySelector('.search-form__send'),
}

class Controller {

  constructor() {
    this.ipinfoAPI = new IpinfoAPI();
    this.geocode = new Geocode();
    this.clock = new Clock();
    this.weather = new Weather();
    this.unsplash = new Unsplash();
    this.yandexAPI = new YandexAPI();
    this.selectors = selectors;

    this.searchValue = 0;
    this.picNum = 0;
    this.lang = 'en';
    this.temp = 0;
    this.date = 0;
  }

  loadLang() {
    let prevLang = localStorage.getItem('lang');

    if (prevLang === null) {
      localStorage.setItem('lang', 'en');
      this.lang = 'en';
      prevLang = this.lang;
    }

    this.setLang(prevLang);
  }

  changeLang() {
    this.setLang(event.target.textContent.toLowerCase());
  }

  setLang(lang) {
    if (this.lang !== lang) {
      this.translate(this.lang, lang)
    }
  }

  async translate(lang1, lang2) {
    load.style.display = 'flex';
    for (let a of Object.values(translateSelectors)) {
      a.innerHTML = await this.yandexAPI.translate(a.innerHTML, lang1, lang2);
    }
    this.lang = lang2;
    localStorage.setItem('lang', lang2);
    load.style.display = 'none';
  }

  loadDegrees() {
    this.temp = localStorage.getItem('temp');

    if (this.temp === 'imperial') {
      btnSwitch.innerHTML = 'F';
    } else {
      btnSwitch.innerHTML = 'M';
    }

    if (this.temp === null) {
      localStorage.setItem('temp', 'metric');
      this.temp = 'metric';
    }
  }

  async changeDegrees() {
    if (this.temp === 'metric') {
      localStorage.setItem('temp', 'imperial');
      this.temp = 'imperial';
      btnSwitch.innerHTML = 'F';
    } else {
      localStorage.setItem('temp', 'metric');
      this.temp = 'metric'
      btnSwitch.innerHTML = 'M';
    }

    await this.makeWeatherRequest();
    this.setTodayWeather();
    this.setOtherWeather();
  }

  async makeGetInfoRequest() {
    await this.ipinfoAPI.getInfo();
    this.ipinfoAPI.getCity();
    this.searchValue = this.ipinfoAPI.city;
  }

  async makeGeocodeRequest() {
    await this.geocode.getInfo(this.searchValue, 'en');
  }

  setCoords() {
    this.geocode.updateCoords(latitude, longitude);
  };

  async setPlace() {
    placeSelector.innerHTML = await this.geocode.getFormattedPlace();
  };

  setWeekDay(date) {
    const days = this.clock.days;
    const day = date.getDay();
    const dayMonth = date.getDate();

    for (let i = 0; i < 4; i += 1) {
      this.selectors[`day${i + day}`].innerHTML = days[i + day].toUpperCase();

      if (i === 0) {
        this.selectors.dayMonth.innerHTML = dayMonth;
      }
    }
  }

  setMonth(date) {
    const months = this.clock.months;
    const month = date.getMonth();

    this.selectors.month.innerHTML = months[month].toUpperCase();
  }

  setDate() {
    const timestamp = this.geocode.getTimestamp();
    this.date = new Date(timestamp);
    const date = this.date;

    this.setWeekDay(date);
    this.setMonth(date);

    this.clock.date = date;
    this.clock.startTimer(timeSelector);
    return timestamp;
  };

  async makeWeatherRequest() {
    await this.weather.getInfo(this.searchValue, 'en', this.temp);
  }

  setTodayWeather() {
    state.innerHTML = `${this.weather.getState()}`;
    tempNow.innerHTML = `${Math.round(this.weather.getTemp())}`;
    feelsLikeNow.innerHTML = `${this.weather.getFeelslike()}&deg;`;
    windNow.innerHTML = `${this.weather.getWind()} m/s`;
    humidityNow.innerHTML = `${this.weather.getHumidity()}%`;
    tempImgNow.src = this.weather.getIcon();
  }

  setOtherWeather() {
    for (let i = 0; i < 3; i++) {
      tempDays[i].innerHTML = `${Math.round(this.weather.getTemp(i + 1))}&deg;`;
      iconDays[i].src = this.weather.getIcon(i + 1, 2);
    }
  }

  createMap(center) {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.geocode.getCoords().reverse(),
      zoom: 8,
      accessToken: 'pk.eyJ1IjoiYXphbWF0LXR1cmJvIiwiYSI6ImNrYXNqYm1wajBrMmkzMW1zM3psYjk5cHEifQ.6BZ2fiSMJylkScQ-R_609w'
    });

    const marker = new mapboxgl.Marker()
      .setLngLat(this.geocode.getCoords().reverse())
      .addTo(map);
  }

  async makeUnsplashRequest() {
    this.picNum = 0;
    await this.unsplash.getInfo(this.searchValue);
  }

  setBackground() {
    document.body.style.backgroundImage = `url(${this.unsplash.getPicture(this.picNum)})`;
  }

  changeBackground() {
    this.picNum += 1;
    this.setBackground();
  }

  async start(place = 'UserLocation') {

    try {
      load.style.display = 'flex';
      if (place === 'UserLocation') {
        await this.makeGetInfoRequest();
      }

      let results = await Promise.all([
        this.loadDegrees(),

        await this.makeGeocodeRequest(),

        await this.makeWeatherRequest(),
        this.setTodayWeather(),
        this.setOtherWeather(),

        this.setDate(),

        this.createMap(),

        this.loadLang(),

        await this.makeUnsplashRequest(),
        await this.setBackground()
      ]);
      await this.setCoords();
      await this.setPlace();
      load.style.display = 'none';
    } catch {
      alert('Please, write correct place');
      load.style.display = 'none';
    }
  }

  async findPlace() {
    event.preventDefault();
    this.searchValue = searchFormInput.value;
    await this.start(this.searchValue);
    await this.translate('en', this.lang);
  }
}

let controller = new Controller();

controller.start();


searchFormSend.onclick = controller.findPlace.bind(controller);
refreshButton.onclick = controller.changeBackground.bind(controller);

btnEngLang.onclick = controller.changeLang.bind(controller);
btnRuLang.onclick = controller.changeLang.bind(controller);
btnBeLang.onclick = controller.changeLang.bind(controller);

btnSwitch.onclick = controller.changeDegrees.bind(controller);