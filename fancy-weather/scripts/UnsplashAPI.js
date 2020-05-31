export default class Unsplash {
    constructor() {
        this.json = 0;
    }

    async getInfo(place) {
        const responce = await fetch(`https://api.unsplash.com/search/photos?orientation=landscape&per_page=100&query=city+${place}&client_id=DhwwYJMTmAmT_gfCBpp6KkehpJS0znyKfbpNcI_jl9k`);
        this.json = await responce.json();
        return this.json;
    }

    getPicture(page = 0) {
        return this.json.results[page].urls.full;
    }
}