export default class Weather {
  constructor() {
    this.json = 0;
  }

  async getInfo(place, lang, temp) {
    const responce = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&lang=${lang}&units=${temp}&APPID=e1e17f3a37078e2e3cae1a4082e20e57`);
    this.json = await responce.json();
    return this.json;
  }

  getTemp(day = 0) {
    return this.json.list[day].main.temp;
  }

  getState() {
    return this.json.list[0].weather[0].description.toUpperCase();
  }

  getFeelslike() {
    return this.json.list[0].main.feels_like;
  }

  getHumidity() {
    return this.json.list[0].main.humidity;
  }

  getWind() {
    return this.json.list[0].wind.speed;
  }

  getTimestamp() {
    return this.json.list[0].dt * 1000;
  }

  getIcon(day = 0, size = 4) {
    const weatherId = String(this.json.list[day].weather[0].id);
    const icon = this.json.list[day].weather[0].icon;

    if (weatherId[0] === '2') {
      return './assets/weather-icons/thunder.svg';
    } if (weatherId[0] === '3') {
      return './assets/weather-icons/drizzle.svg';
    } if (weatherId[0] === '5') {
      return './assets/weather-icons/rain.svg';
    } if (weatherId[0] === '6') {
      return './assets/weather-icons/snow.svg';
    } if (weatherId[0] === '7') {
      return './assets/weather-icons/cloudy.svg';
    } if (weatherId === '800') {
      if (icon === '01d') {
        return './assets/weather-icons/day.svg';
      }
      return './assets/weather-icons/night.svg';
    } if (weatherId.slice(0, 2) === '80') {
      return './assets/weather-icons/cloudy.svg';
    }

    return weatherId;

    // return `https://openweathermap.org/img/wn/${this.json.list[day].weather[0].icon}@${size}x.png`;
  }
}
