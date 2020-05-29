export default class IpinfoAPI {
    constructor() {
        this.json = 0;
        this.city = 0;
    }

    async getInfo() {
        const responce = await fetch(`https://ipinfo.io?token=cb17f80674ecf7`);
        this.json = await responce.json();
        return this.json;
    }

    getCity() {
        this.city = this.json.city;
        return this.city;
    }
}