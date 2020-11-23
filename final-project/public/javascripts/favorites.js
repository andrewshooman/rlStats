import countryOfPlayers from "../data/countryOfPlayers.js";
import currentTeams from "../data/currentTeams.js";


let favoritedPlayers = []
let favoritedTeams = []
let tmpGlobalincrement = 1;
function findCountry(player) {
    let country = ""
    // console.log(player)
    for (let i = 1; i < countryOfPlayers.length; i++) {
        let playerArr = countryOfPlayers[i].players
        for (let j = 0; j < playerArr.length; j++) {
            if (playerArr[j].toLowerCase() == player) {
                country = countryOfPlayers[i];
                return country
            }
        }
    }
    return countryOfPlayers[0]
}
function findCurrentTeamByPlayer(player) {
    // let lookie = dataset[0].players.find(p => p.name == player)
    for (let i = 0; i < currentTeams.length; i++) {
        if (currentTeams[i].status) {
            if (currentTeams[i].sub.toLowerCase() == player.toLowerCase() || currentTeams[i].coach.toLowerCase() == player.toLowerCase() ) {
                return currentTeams[i];
            }
            let playerArr = currentTeams[i].players
            for (let j = 0; j < playerArr.length; j++) {
                if (playerArr[j].toLowerCase() == player.toLowerCase()) {
                    return currentTeams[i];
                }
            }
        }
    }
    return (currentTeams[0])
}
function renderPlayerCard(player) {
    let country = findCountry(player.name.toLowerCase())
    let team = findCurrentTeamByPlayer(player.name)

    $('#table').append(
        `<div id="${player.name}" class="box">
                <div class="columns is-multiline justify-center">
                    <div class="column">
                        <h1 class="title" style="">${player.name}</h1>
                        <h2 id="${player}Status" class="true">Status: ${team.name != "Not Found" ? "Active" : "Free Agent"}&nbsp<img width="18px" height="18px" src="${team.name != "Not Found" ? "../images/icons/Green Status.jpg" : "../images/icons/Blue Status.jpg"}"></h2>
                        <h2>Country of Origin: ${country.name}</h2>
                        <h2>Team: ${team.name}</h2>
                    </div>
                    <div class="column">
                        <span class="is-italic has-text-weight-semibold"></span>
                        <p></p>
                    </div>
                </div>
            </div>`)
}

function renderTeamCard(team) {
    // let country = findCountry(player.name.toLowerCase())
    // let team = findCurrentTeamByPlayer(player.name)
    let teamPlayers = ""
    for (let i = 0; i < team.players.length; i++) {
        teamPlayers += `<li> - <a id="${team.players[i].name + "Name"}" class="playerName">${team.players[i].name}</a></li>`
    }

    let teamSub = ""
    if (team.sub != "") {
        teamSub = `<a id="${team.sub + "Name"}" class="playerName">${team.sub}</a>`
    }

    let teamCoach = ""
    if (team.coach != "") {
        teamCoach = `<a id="${team.coach + "Name"}" class="playerName">${team.coach}</a>`
    }

    let teamStatus = ""
    let teamStatusIMG = ""
    if (team.status) {
        if (team.players.length < 3) {
            teamStatus = "Incompete Roster"
            teamStatusIMG = "../images/icons/Blue Status.jpg"
        } else {
            teamStatus = "Active"
            teamStatusIMG = "../images/icons/Green Status.jpg"
        }
    } else {
        teamStatus = "Inactive"
        teamStatusIMG = "../images/icons/Red Status.jpg"
    }

    $('#table').append(
        `<div id="${team.name}" class="box">
                <div class="columns is-multiline justify-center">
                    <div class="column">
                        <h1 class="title" style="">${team.name}</h1>
                    </div>
                    <div class="column">
                        <h2 class="subtitle">Members</h2>
                        <ul>
                            ${teamPlayers}
                        </ul>
                    </div>
                    <div class="column">
                        <span class="is-italic has-text-weight-semibold"></span>
                        <p></p>
                    </div>
                </div>
            </div>`)
}

function handleTeamsButtonClick() {
    tmpGlobalincrement = 1;
    $("#table").empty();
    for (let i = 0; i < favoritedTeams.length; i++) {
        renderTeamCard(favoritedTeams[i]);
    }
}

function handlePlayersButtonClick() {
    tmpGlobalincrement = 1;
    $("#table").empty();
    for (let i = 0; i < favoritedPlayers.length; i++) {
       renderPlayerCard(favoritedPlayers[i]);
    }
}
function loadStuffIntoDom() {
    $(document).on("click", "#lbteams", handleTeamsButtonClick)
    $(document).on("click", "#lbplayers", handlePlayersButtonClick)
    $.ajax({
        url: '/secret',
        type: 'GET',
        dataType: 'json',
        success: function (response, textStatus, jqXHR) {
            console.log(jqXHR.responseJSON);
            favoritedPlayers = jqXHR.responseJSON;
            // for (let i = 0; i < jqXHR.responseJSON.length; i++) {
            //     renderPlayerCard(jqXHR.responseJSON[i]);
            // }
        }
    })
    $.ajax({
        url: '/secretteam',
        type: 'GET',
        dataType: 'json',
        success: function (response, textStatus, jqXHR) {
            console.log(jqXHR.responseJSON);
            favoritedTeams = jqXHR.responseJSON;      
        }
    })
}
loadStuffIntoDom();