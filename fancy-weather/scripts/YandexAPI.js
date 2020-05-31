export default class YandexAPI {
  constructor() {
    this.json = 0;
  }

  async getInfo(value, lang) {
    const responce = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200509T182415Z.28d28ce3d1a7efd0.f489f83dd586544c20787a511bba0b474352d4b1&text=${value}&lang=ru-en`);
    this.json = await responce.json();
    return this.json;
  }

  isRussian(value) {
    return /[а-я]/i.test(value);
  }
}
