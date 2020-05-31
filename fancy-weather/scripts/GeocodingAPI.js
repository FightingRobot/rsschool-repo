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
        const city = this.json.results[0]['formatted'].split(',')[0];
        // const city = this.json.results[0]['components'].city;
        const country = this.json.results[0]['components'].country;
        return [city, country].join(' ');
    }

    getTimestamp() {
        const date1 = new Date();
        const date2 = this.json.results[0].annotations.timezone.offset_sec / 3600;
        return date1.setUTCHours(date1.getUTCHours() + date2 - 3);
        // return this.json.results[0].annotations.timezone.offset_sec / 3600;
    }

    getCoords() {
        const lat = this.json.results[0].geometry.lat.toFixed(4);
        const lng = this.json.results[0].geometry.lng.toFixed(4);
        return [lat, lng];
    }

    getVisualCoords() {
        const lat = this.json.results[0].annotations.DMS.lat;
        const lng = this.json.results[0].annotations.DMS.lng;
        // alert(lng)
        return [`${lat.slice(0, 8)} ${lat.slice(-1)}`, `${lng.slice(0, 8)} ${lng.slice(-1)}`];
    }

    updateCoords(lat, long) {
        let latlong = this.getVisualCoords();
        lat.innerHTML = latlong[0];
        long.innerHTML = latlong[1];
        return latlong;
    }
}