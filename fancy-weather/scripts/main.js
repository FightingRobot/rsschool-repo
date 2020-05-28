import IpinfoAPI from './IpinfoAPI.js';
import Geocode from './GeocodingAPI.js';
import Clock from './Clock.js';

const latitude = document.querySelector('.latitude');
const longitude = document.querySelector('.longitude');
const placeSelector = document.querySelector('.temp-info__country');
const dateSelector = document.querySelector('.temp-info__date');

class Controller {

  constructor() {
    this.ipinfoAPI = new IpinfoAPI();
    this.geocode = new Geocode();
    this.clock = new Clock();
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
}

let controller = new Controller();

async function allSystemsActivate() {
  await controller.makeGetInfoRequest();
  await controller.setCoords();

  await controller.makeGeocodeRequest();
  await controller.setPlace();

  await controller.setDate()
}

allSystemsActivate();