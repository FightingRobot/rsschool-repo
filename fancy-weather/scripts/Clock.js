export default class Clock {
    constructor() {
        this.date = 0;
        this.timer = 0;
    }

    setClock(selector) {
        selector.innerHTML = String(this.date).slice(0, 25);
        this.date.setSeconds(this.date.getSeconds() + 1);
    }

    startTimer(selector) {
        clearInterval(this.timer);
        this.timer = setInterval(() => this.setClock(selector), 1000);
        this.setClock(selector);
    }
}