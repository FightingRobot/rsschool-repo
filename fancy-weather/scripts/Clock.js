export default class Clock {
    constructor() {
        this.date = 0;
        this.dateSelector = document.querySelector('.temp-info__date');
    }

    async clock(date) {
        // let hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
        // let minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        // let seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
        this.dateSelector.innerHTML = String(new Date(date)).slice(0, 25);
        setInterval(this.clock(date), 1000);
        date += 1;
    }

    // async startTimer(date) {

    // }
}