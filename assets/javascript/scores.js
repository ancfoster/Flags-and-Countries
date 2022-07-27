/* jshint esversion: 11 */

//Global Scope Variables
let body = document.body;
let scoresCont = document.getElementById("scores-cont");
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
        document.getElementById("clear-scores").addEventListener("click", displayConfirmationModal);
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
// This function is called when the clear scores button is pressed.
// It presents the UI asking the user to confirm their decision. If the user confirms the scores are deleted, otherwise the UI is removed. 
function displayConfirmationModal() {
    let endGameUI = document.createElement('div');
    endGameUI.id = 'confirmation-modal';
    endGameUI.innerHTML = `
     <div id="confirmation-modal-inner">
        <span id="confirmation-modal-heading">Are you sure you wish to delete your scores?</span>
        <button type="button" class="confirmation-modal-buttons" id="confirmation-modal-yes" aria-roledescription="Confirms decision to delete scores">Yes</button>
        <button type="button" class="confirmation-modal-buttons" id="confirmation-modal-no" aria-roledescription="Cancels decision to delete scores, closes menu">No</button>
    </div>       
    `;
    body.appendChild(endGameUI);
    document.getElementById("confirmation-modal-yes").addEventListener("click", yesOptionModal);
    // If the user selects no the coe simply removes the modal
    document.getElementById("confirmation-modal-no").addEventListener("click", function() {
       document.getElementById("confirmation-modal").remove();
    });
}
// This function is called when the user confirms 'Yes' in th emodal that they wish to quit the game. Removes the modal, on screen question, control bar, resets the gradient and then loads the main menu assets.
function yesOptionModal() {
    document.getElementById("confirmation-modal").remove();
    clearScores();
}
// Clears information from localStorage (except set player name) and hides the score table.
function clearScores(){
    localStorage.removeItem('scores');
    localStorage.removeItem('highScore');
    document.getElementById('score-statement').innerHTML = "No scores to show.";
    document.getElementById('clear-scores').remove();
    document.getElementById('score-table').style.display='none';
}