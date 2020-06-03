export default class IpinfoAPI {
  constructor() {
    this.json = 0;
    this.city = 0;
  }

  async getInfo() {
    try {
      const responce = await fetch('https://ipinfo.io?token=cb17f80674ecf7');
      this.json = await responce.json();
      return this.json;
    } catch {
      document.querySelector('.error-box').textContent = 'IPinfo request cannot be done. Please, turn off the ADBlock. Loading results for another city.';
      this.json = {
        city: 'Lida',
      };
      return this.json;
    }
  }

  getCity() {
    this.city = this.json.city;
    return this.city;
  }
}
