import IpinfoAPI from './IpinfoAPI.js';
import Geocode from './GeocodingAPI.js';
import Clock from './Clock.js';

let ipinfoAPI = new IpinfoAPI();
let geocode = new Geocode();
let clock = new Clock();

const latitude = document.querySelector('.latitude');
const longitude = document.querySelector('.longitude');
const placeSelector = document.querySelector('.temp-info__country');
const dateSelector = document.querySelector('.temp-info__date');

class Controller() {

  setCoords() {
    ipinfoAPI.updateCoords(latitude, longitude);
  }

  async setPlace() {
    let city = await ipinfoAPI.getCity();
    let place = await geocode.getFormattedPlace(city, 'en');

    placeSelector.innerHTML = place;
  }

  async getDate() {
    let city = await ipinfoAPI.getCity();
    let timestamp = await geocode.getTimestamp(city, 'en');
    clock.date = timestamp;
    // clock.startTimer(clock.date);
    return timestamp;
  }
}

let controller = new Controller();


setPlace();
setCoords();
getDate()