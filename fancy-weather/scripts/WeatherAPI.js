export default class Weather {
    constructor() {
        this.json = 0;
    }

    async getInfo(place, lang) {
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&lang=${lang}&units=metric&APPID=e1e17f3a37078e2e3cae1a4082e20e57`);
        this.json = await responce.json();
        // alert(this.json)
        // alert(this.json.list[0].weather[0].icon)
        // alert(this.json.list[0].main.feels_like)
        // alert(this.json.list[0].main.humidity)
        // alert(this.json.list[0].wind.speed)
        // for (let a in this.json.list[0].main.temp) {
        //     alert(this.json.list)
        // }
        return this.json;
    }

    getTemp() {
        return this.json.list[0].main.temp;
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

    getIcon() {
        return `http://openweathermap.org/img/wn/${this.json.list[0].weather[0].icon}@4x.png`;
    }
}