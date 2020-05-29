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
        const results = this.json.results[0]['formatted'].split(',');
        return [results[0], results[1]].join(', ');
    }

    getTimestamp() {
        // alert(this.json['timestamp']['created_http']);
        // return this.json['timestamp']['created_http'];
        const date1 = new Date();
        // alert(ass1);
        const date2 = this.json.results[0].annotations.timezone.offset_sec / 3600;
        // alert(this.json.results[0].annotations.timezone.offset_sec);
        // return [ass1, ass2];
        // alert(date1.setHours(date1.getUTCHours() + date2))
        return date1.setHours(date1.getUTCHours() + date2);
        // return this.json.results[0].annotations.timezone.offset_sec / 3600;
    }

    getCoords() {
        const lat = this.json.results[0].geometry.lat.toFixed(4);
        const lng = this.json.results[0].geometry.lng.toFixed(4);
        return [lat, lng];
    }

    updateCoords(lat, long) {
        let latlong = this.getCoords();
        lat.innerHTML = latlong[0];
        long.innerHTML = latlong[1];
        return latlong;
    }
}