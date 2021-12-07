var fetchApi = new gamesApi();
var allGames = [];
var gameListDiv = document.getElementById("gameList");
var gameTitle = document.getElementById("gameTitle");
var gameType = document.getElementById("gameType");
var gameDescription = document.getElementById("gameDescription");
// var gameInfos = new infosApi();


document.addEventListener("onload", getAllGames());

function getAllGames() {
    fetchApi.getGamesData()
    .then(function(response) {
        let objectKeys = [];
        objectKeys = Object.keys(response);
        for(let i=0;i<objectKeys.length;i++) {
            let newGame = game.convertGame(objectKeys[i], response);
            allGames.push(newGame);
        }
        updateGameList();
    });
}

function updateGameList() {
    gameTitle.innerHTML = allGames[0].title;
    gameType.innerHTML = "Game type:" + allGames[0].genre;
    document.getElementById("actualGameButton").setAttribute("onclick", "gameDetails(" + 0 + ")");
    for(let i=0;i<allGames.length;i++) {
        let emptyDiv = document.createElement("div");
        let newGameDiv = document.createElement("div");
        newGameDiv.appendChild(emptyDiv);
        let newButton = document.createElement("button");
        newButton.innerHTML = "<i class='fa fa-trash' style='font-size:20px'></i>";
        newButton.setAttribute("class", "buttons");
        newButton.setAttribute("id", "button" + allGames[i].id)
        newButton.setAttribute("onclick", "deleteGame(" + i + ",this.id.slice(6))")
        newGameDiv.appendChild(newButton);
        if(allGames[i].imageUrl === "") {
            newGameDiv.style.backgroundImage = "url(images/error.jpg)";
        }
        else {
            newGameDiv.style.backgroundImage = "url(" + allGames[i].imageUrl + ")";
        }
        newGameDiv.setAttribute("class", "gameDiv")
        newGameDiv.setAttribute("id", i);
        newGameDiv.setAttribute("onclick", "toActualGame(this.id)")
        gameListDiv.appendChild(newGameDiv);
    }
    let lastGameDiv = document.createElement("div");
    let lastButton = document.createElement("button");
    let emptyDiv = document.createElement("div");
    lastButton.innerHTML = "Add Game";
    lastGameDiv.setAttribute("id", "ownGameDiv");
    lastGameDiv.appendChild(emptyDiv);
    lastGameDiv.appendChild(lastButton);
    lastButton.setAttribute("class", "buttons");
    lastButton.setAttribute("onclick", "addOwnGame()");
    lastGameDiv.setAttribute("class", "gameDiv");
    lastGameDiv.setAttribute("onclick", "actualGameAdd()");
    gameListDiv.appendChild(lastGameDiv);
}

window.addEventListener("wheel", function(e) {
    if (e.deltaY > 0) gameListDiv.scrollLeft += 40;
    else gameListDiv.scrollLeft -= 40;
})

function toActualGame(i) {
    gameTitle.innerHTML = allGames[i].title;
    gameType.innerHTML = "Game type: " + allGames[i].genre;
    document.getElementById("actualGameButton").setAttribute("onclick", "gameDetails(" + i + ")");
}

function actualGameAdd() {
    gameTitle.innerHTML = "Add your own game :)";
    gameType.innerHTML = "";
    gameDescription.innerHTML = "";
    document.getElementById("actualGameButton").setAttribute("onclick", "addOwnGame()");
}

function deleteGame(id,trueId) {
    console.log(trueId);
    document.getElementById("gameList").innerHTML = "";
    allGames.splice(id, 1);
    updateGameList();
    var deleteApi = new gamesApi;
    deleteApi.deleteGame(trueId);
}

function gameDetails(id) {
    location.replace("details.html?id=" + allGames[id].id);
}

function addOwnGame() {
    location.replace("details.html?id=" + "addOwnGamePage");
}