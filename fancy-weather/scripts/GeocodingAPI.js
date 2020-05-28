export default class Geocode {
    constructor() {
        this.json = 0;
    }

    async getInfo(place, lang) {
        const responce = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=312a0963d57a43dba22ef5cf98c06292&language=${lang}`);
        this.json = await responce.json();
        return this.json;
    }

    getFormattedPlace() {
        return this.json.results[0]['formatted'];
    }

    getTimestamp() {
        return this.json['timestamp']['created_http'];
    }
}