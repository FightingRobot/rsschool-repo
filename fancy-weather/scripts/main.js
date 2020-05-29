import IpinfoAPI from './IpinfoAPI.js';
import Geocode from './GeocodingAPI.js';
import Clock from './Clock.js';
import Weather from './WeatherAPI.js';

const latitude = document.querySelector('.latitude');
const longitude = document.querySelector('.longitude');
const placeSelector = document.querySelector('.temp-info__country');
const dateSelector = document.querySelector('.temp-info__date');

const tempNow = document.querySelector('.temp-info__temp-now');
const tempImgNow = document.querySelector('.temp-info__img-now');
const feelsLikeNow = document.querySelector('.temp-info__feels-like_now');
const windNow = document.querySelector('.temp-info__wind-speed_now');
const humidityNow = document.querySelector('.temp-info__humidity_now');

const tempDays = document.querySelectorAll('.temp-info__temp');
const iconDays = document.querySelectorAll('.temp-info__img');

class Controller {

  constructor() {
    this.ipinfoAPI = new IpinfoAPI();
    this.geocode = new Geocode();
    this.clock = new Clock();
    this.weather = new Weather();
  }

  async makeGetInfoRequest() {
    await this.ipinfoAPI.getInfo();
    this.ipinfoAPI.getCity();
  }

  setCoords() {
    this.ipinfoAPI.updateCoords(latitude, longitude);
  };

  async makeGeocodeRequest() {
    await this.geocode.getInfo(this.ipinfoAPI.city, 'en');
  }

  async setPlace() {
    placeSelector.innerHTML = await this.geocode.getFormattedPlace();
  };

  setDate() {
    const timestamp = this.geocode.getTimestamp()
    this.clock.date = new Date(timestamp);
    this.clock.startTimer(dateSelector);
    return timestamp;
  };

  async makeWeatherRequest() {
    await this.weather.getInfo(this.ipinfoAPI.city, 'en');
  }

  setTodayWeather() {
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
      // alert(this.weather.getIcon(i + 1))
    }
  }
}

let controller = new Controller();

async function allSystemsActivate() {
  await controller.makeGetInfoRequest();
  await controller.setCoords();

  await controller.makeGeocodeRequest();
  await controller.setPlace();

  await controller.makeWeatherRequest()
  controller.setTodayWeather();
  controller.setOtherWeather();

  await controller.setDate();
}

allSystemsActivate();