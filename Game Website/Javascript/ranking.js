let array_scores = [];
let array_names = [];
//creates an array to store all the accounts score 
for ( let i = 0; i < localStorage.length; i++) {
    let access = localStorage.key(i);
    let local = JSON.parse(localStorage.getItem(access));
    let score = local.score;
    array_scores[i] = score;
}
//modifies the array to put the high scores first
array_scores.sort();
array_scores.reverse();
//creates another array store the players names in the same order as their score
for (let k = 0; k < localStorage.length; k++) {
for (let j = 0; j < localStorage.length; j++) {
    let access = localStorage.key(j);
    let local = JSON.parse(localStorage.getItem(access));
    let score = local.score;
    let name = local.username;
    if (array_scores[k] == score) {
        array_names[k] = name;
    }
}
}
//display the score and the names of the players inside the ranking table
document.addEventListener('DOMContentLoaded', display_score1);
function display_score1() {
    var position = document.getElementById("rank_table").rows[1].cells;
    position[2].innerHTML = array_scores[0];
}
document.addEventListener('DOMContentLoaded', display_score2);
function display_score2() {
    var position = document.getElementById("rank_table").rows[2].cells;
    position[2].innerHTML = array_scores[1];
}
document.addEventListener('DOMContentLoaded', display_score3);
function display_score3() {
    var position = document.getElementById("rank_table").rows[3].cells;
    position[2].innerHTML = array_scores[2];
}
document.addEventListener('DOMContentLoaded', display_name1);
function display_name1() {
    var position = document.getElementById("rank_table").rows[1].cells;
    position[1].innerHTML = array_names[0];
}
document.addEventListener('DOMContentLoaded', display_name2);
function display_name2() {
    var position = document.getElementById("rank_table").rows[2].cells;
    position[1].innerHTML = array_names[1];
}
document.addEventListener('DOMContentLoaded', display_name3);
function display_name3() {
    var position = document.getElementById("rank_table").rows[3].cells;
    position[1].innerHTML = array_names[2];
}

/*if there is an account logged in, then the high score and ranking position
of this player are displayed inside the containers*/
document.addEventListener('DOMContentLoaded', show);
function show() {
let access_local = sessionStorage.key(0);
let details_session = JSON.parse(sessionStorage.getItem(access_local));
let local_user = JSON.parse(localStorage.getItem(access_local));
let container1 = document.getElementById("player_score");
let container2 = document.getElementById("player_rank");

if (access_local == "IsThisFirstTime_Log_From_LiveServer") {
    let access_local2 = sessionStorage.key(1);
    let details_session2 = JSON.parse(sessionStorage.getItem(access_local2));
    let local_user2 = JSON.parse(localStorage.getItem(access_local2));
    if (details_session2) {
        console.log(local_user2.score);
        console.log(array_scores.indexOf(local_user2.score) + 1);
        container1.innerHTML = local_user2.score;
        container2.innerHTML = array_scores.indexOf(local_user2.score) + 1;
    }
}
else {
    if (details_session) {
        console.log(local_user.score);
        console.log(array_scores.indexOf(local_user.score) + 1);
        container1.innerHTML = local_user.score;
        container2.innerHTML = array_scores.indexOf(local_user.score) + 1;
    }
}    
}
