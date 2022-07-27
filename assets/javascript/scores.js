/* jshint esversion: 11 */
scoresCont = document.getElementById("scores-cont");
//When back button clicked takes user back to main menu
document.getElementById("back-button").addEventListener("click", function() {
window.location.href='index.html';
});
// Loads the main content. The if statement checks if there any scores to display or not
loadScoresUI();
function loadScoresUI() {
    if(localStorage.getItem("scores") == null) {
        noScoresUI();
    }
    else {
        createScoreTableUI();
        document.getElementById("clear-scores").addEventListener("click", clearScores);
    }
}
// If there are no saved score in local storage this function generates the necessary HTML
function noScoresUI() {
    scoresCont.innerHTML = `
    <div id="score-statement">No scores to show.</div>    
    `; 
}
// If there are scores saved in local storage this function generates the scores UI and creates a blank table.
function createScoreTableUI() {
    let lsHighScore = localStorage.getItem('highScore');
    let lsHighPlayer = localStorage.getItem('highScorePlayer');
    let newScoresUI = document.createElement('div');
    // Blank table ready to receieve rows with data from the populateScoresTable function.
    scoresCont.innerHTML = `
    <div id="score-statement"><span>${lsHighPlayer}</span> has the highest score of <span>${lsHighScore}</span> points.</div>
        <table id="score-table">
        <tr>
            <th>Player</th>
            <th>Points</th>
            </tr>
        </table>
    <button id="clear-scores" type="button">Clear Scores</button>
    `;
    populateScoresTable();
}
// Obtains the scores and player information from localStorage in string format, converts in into an array (consisting of objects), extracts the score and player from each object and outputs as a HTML row.
function populateScoresTable(){
    // Local storage is just a string value, so to get the scores back into JSON the string must first be parsed
    let arrayScores = JSON.parse(localStorage.getItem("scores"));
    let scoreTable = document.getElementById('score-table');
    // For each array score outputs a table row with two TDs, one containing the player name and the second the score that was achieved. 
    for(let arrayItem = 0; arrayItem < arrayScores.length; arrayItem++) {
        let row = (arrayScores[arrayItem]);
        let tablePlayer = (row.player);
        let tableScore = (row.gameScore);
        let newRow = document.createElement('tr');
        newRow.innerHTML =  `<td>${tablePlayer}</td><td>${tableScore}</td>`;
        scoreTable.appendChild(newRow);
    }
}