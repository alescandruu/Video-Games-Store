var gameImage = document.getElementById("gameDetailsImage");
var gameTitle = document.getElementById("gameDetailsTitle");
var gameType = document.getElementById("gameDetailsType");
var gamePublisher = document.getElementById("gameDetailsPublisher");
var gameRelease = document.getElementById("gameDetailsRelease");
var titleInput = document.getElementById("titleInput");
var typeInput = document.getElementById("typeInput");
var publisherInput = document.getElementById("publisherInput");
var releaseInput = document.getElementById("releaseInput");
var urlInput = document.getElementById("urlInput");

document.getElementById("homeButton").addEventListener("click", goHome);

function goHome() {
    location.replace("index.html");
}

document.addEventListener("onload", getGameInfos());

function getGameInfos() {
    let url = location.href;
    let position = url.search("id") + 3;
    let id = url.slice(position);
    if(id !== "addOwnGamePage") {
        var gameDetailsApi = new gamesApi();
        gameDetailsApi.getGameData(id)
        .then(function(response) {
            console.log(response);
            gameImage.setAttribute("src", response.imageUrl);
            gameTitle.innerHTML = response.title;
            gameType.innerHTML = "Game type: " + response.genre;
            gamePublisher.innerHTML = "Game publisher: " + response.publisher;
            gameRelease.innerHTML = "Release date: " + response.releaseDate;
        });
    } else {
        gameImage.setAttribute("src", "images/game1.jpg");
        document.getElementById("editGameButton").innerHTML = "Add Game";
        gameTitle.innerHTML = "Be yourself. Play within yourself. Play your own game."
    }
}

document.getElementById("editGameButton").addEventListener("click", function() {
    document.getElementById("modifyGame").style.display = "flex";
});

document.getElementById("okButton").addEventListener("click", addAndEdit);

function addAndEdit() {
    let url = location.href;
    let position = url.search("id") + 3;
    let id = url.slice(position);
    if(id !== "addOwnGamePage") {
        var putApi = new gamesApi();
        var typeInput1, urlInput1, publisherInput1, releaseInput1, titleInput1;
        if(typeInput.value === "") {
            typeInput1 = gameType.innerHTML.slice(11);
        } else {
            typeInput1 = typeInput.value;
        }
        if(urlInput.value === "") {
            urlInput1 = gameImage.src;
        } else {
            urlInput1 = urlInput.value;
        }
        if(publisherInput.value === "") {
            publisherInput1 = gamePublisher.innerHTML.slice(16);
        } else {
            publisherInput1 = publisherInput.value;
        }
        if(releaseInput.value === "") {
            releaseInput1 = gameRelease.innerHTML.slice(14);
        } else {
            releaseInput1 = releaseInput.value;
        }
        if(titleInput.value === "") {
            titleInput1 = gameTitle.innerHTML;
        } else {
            titleInput1 = titleInput.value;
        }
        putApi.editGame(id, typeInput1, urlInput1, publisherInput1, releaseInput1, titleInput1);
        titleInput.value = "";
        typeInput.value = "";
        publisherInput.value = "";
        releaseInput.value = "";
        urlInput.value = "";
        document.getElementById("approved").style.display = "block";
        setTimeout(function() {
            document.getElementById("approved").style.display = "none";
        }, 3000);
    }
    else {
        console.log("da");
        var postGameApi = new gamesApi();
        postGameApi.postGame(typeInput.value, urlInput.value, publisherInput.value, releaseInput.value, titleInput.value);
        titleInput.value = "";
        typeInput.value = "";
        publisherInput.value = "";
        releaseInput.value = "";
        urlInput.value = "";
        document.getElementById("approved").style.display = "block";
        setTimeout(function() {
            document.getElementById("approved").style.display = "none";
        }, 3000);
    }
}