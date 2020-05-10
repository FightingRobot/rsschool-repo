export default class OmdbAPI {
    constructor() {
        this.currentSearchValue = undefined;
        this.currentPage = 1;
    }

    async getList(movie, page) {
        let responce = await fetch(`http://www.omdbapi.com/?s=${movie}&page=${page}&apikey=999d8d5b`);
        let json = await responce.json();
        return json.Search
    }

    async getId(movie) {
        let imdbid = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=999d8d5b`);
        let json = await imdbid.json();
        return json.imdbRating
    }
}