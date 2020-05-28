export default class Geocode {

    async getInfo(place, lang) {
        const responce = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=312a0963d57a43dba22ef5cf98c06292&language=${lang}`);
        const json = await responce.json();
        return json
    }

    async getFormattedPlace(place, lang) {
        const responce = await this.getInfo(place, lang);
        return responce.results[0]['formatted'];
    }

    async getTimestamp(place, lang) {
        const responce = await this.getInfo(place, lang);
        return responce['timestamp']['created_http'];
    }
}