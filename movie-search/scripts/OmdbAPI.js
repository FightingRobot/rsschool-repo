export default class OmdbAPI {
    constructor() {

    }

    async getList(movie) {
        let responce = await fetch(`http://www.omdbapi.com/?s=${movie}&apikey=999d8d5b`);
        let json = await responce.json();
        return json.Search
    }

    async getId(movie) {
        let imdbid = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=999d8d5b`);
        let json = await imdbid.json();
        return json.imdbRating
    }
}