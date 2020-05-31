export default class Clock {
    constructor() {
        this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.date = 0;
        this.timer = 0;
    }

    setClock(selector) {
        const dayW = this.date.getDay();
        const month = this.date.getMonth();
        const dayM = this.date.getDate();
        const hours = this.date.getHours();
        const mins = this.date.getMinutes();
        const secs = this.date.getSeconds();
        // selector.innerHTML = String(this.date).slice(15, 25);
        selector.innerHTML = `${String(this.date).slice(15, 25)}`;
        // alert(this.date.getFullYear());
        // alert(this.date.getDate());
        this.date.setSeconds(this.date.getSeconds() + 1);
    }

    startTimer(selector) {
        clearInterval(this.timer);
        this.timer = setInterval(() => this.setClock(selector), 1000);
        this.setClock(selector);
    }
}