class game {
    constructor(genre, imageUrl, publisher, releaseDate, title, id) {
        this.genre = genre;
        this.imageUrl = imageUrl;
        this.publisher = publisher;
        this.releaseDate = releaseDate;
        this.title = title;
        this.id = id;
    }

    static convertGame(id, response) {
        return new game(response[id].genre, response[id].imageUrl, response[id].publisher, response[id].releaseDate, response[id].title, id);
    }
}