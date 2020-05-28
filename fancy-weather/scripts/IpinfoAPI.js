export default class IpinfoAPI {
    async getInfo() {
        const responce = await fetch(`https://ipinfo.io?token=cb17f80674ecf7`);
        const json = await responce.json();
        // const json = await responce.text();
        // alert(json)
        return json;
    }

    async getCoords() {
        const responce = await this.getInfo();
        return responce.loc.split(',');
    }

    async getCity() {
        const responce = await this.getInfo();
        // alert(responce.city)
        return responce.city;
    }

    async updateCoords(lat, long) {
        let latlong = await this.getCoords();
        lat.innerHTML = latlong[0];
        long.innerHTML = latlong[1];
        return latlong;
    }
}