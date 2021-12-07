class gamesApi {
    constructor() {
        this.url = "https://games-world-09-default-rtdb.europe-west1.firebasedatabase.app/";
    }

    getGamesData() {
        return (fetch(this.url+ ".json", {method: 'GET'})
        .then(function(response) {
            if(response.ok) {
                return response.json();
            }
        })
        .then(function(response) {
            return response;
        }));
    }

    getGameData(id) {
        return (fetch(this.url + id + ".json", {method: 'GET'})
        .then(function(response) {
            if(response.ok) {
                return response.json();
            }
        })
        .then(function(response) {
            return response;
        }));
    }

    editGame(id, typeInput, urlInput, publisherInput, releaseInput, titleInput) {
        fetch(this.url + id + ".json",{
            method: 'PUT',
            body: JSON.stringify({
                genre: typeInput,
                imageUrl: urlInput,
                publisher: publisherInput,
                releaseDate: releaseInput,
                title: titleInput
            })
        });
    }

    deleteGame(id) {
        fetch(this.url + id + ".json", {method: 'DELETE'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
        });
    }

    postGame(typeInput, urlInput, publisherInput, releaseInput, titleInput) {
        fetch(this.url + ".json",{
            method: 'POST',
            body: JSON.stringify({
                genre: typeInput,
                imageUrl: urlInput,
                publisher: publisherInput,
                releaseDate: releaseInput,
                title: titleInput
            })
        });
    }
}