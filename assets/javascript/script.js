/* jshint esversion: 11 */

//Global Scope Variables
let body = document.body;
let currentQuestion = 1;
let score = 0;
let currentLevel = 1;
let questionType = null;
let levelQuestion = null;
let currentAnswerIndex = 0;
let currentCorrectAnswerID = 0;
let currentIncorrectAnswer1ID = 0;
let currentIncorrectAnswer2ID = 0;
let incorrectAnswer1Position = null;
let incorrectAnswer2Position = null;
let correctAnswerPosition = null;
let progressRingPercent = 1;
let levelOptions = [];
let answerSelected = null;
let soundEnabled = true;
let playerName = 'Player001';
let highScore = 0;
let outerContainer = document.getElementById('outer-container');


// Loads Main Menu Screen Upon Loading Body
body.addEventListener("load", mainMenuLoad());
function mainMenuLoad() {
    outerContainer.innerHTML = `
    <div id="home-screen">
       <h1>Flags &<br>Countries</h1>
       <h2>The Geography Game</h2>
       <img src="assets/images/globe.png">
       <div id="main-menu-buttons-flex">
        <button type="button" id="main-play">Play</button>
        <button type="button" id="main-scores">Scores</button>
        <button type="button" id="main-how-to-play">How to Play</button>
       </div>
   </div> `;
   document.getElementById("main-play").addEventListener("click", enterPlayerContainer);
   document.getElementById("main-scores").addEventListener("click", loadScoresUI);
}
function checkLocalStorage() {
    if(localStorage.getItem("playerName") == null) {
        localStorage.setItem("playerName", "Player001");
        localStorage.setItem("highScore", 0);
        localStorage.setItem("highScorePlayer", "Player001")
    }
    else {
        playerName = localStorage.getItem("playerName");
        highScore = localStorage.getItem("highScore");
    }
}
function enterPlayerContainer() {
    checkLocalStorage();
    outerContainer.innerHTML = `
    <div id="enter-player-container">
        <form>
           <label>Enter player name:</label>
           <input type="text" id="player-name-input" value="${playerName}" maxlength="15">
           <span id="input-warning"></span>
           <button type="button" id="enter-player-name-button">Start Game</button>
       </form>
    </div>
    `;
    document.getElementById("enter-player-name-button").addEventListener("click", function() {
       if(document.getElementById("player-name-input").value.length <= 2) {
           document.getElementById("input-warning").innerHTML="Name must be between 3-15 characters.";
       }
       else {
            playerName = document.getElementById("player-name-input").value;
           localStorage.setItem("playerName", document.getElementById("player-name-input").value);
           newGame();
       }
    });
}
function newGame() {
    outerContainer.innerHTML = "";
    score = 0;
    currentLevel = 1;
    currentQuestion = 1;
    progressRingPercent = 1;
    updateProgressRing(1);
    questionType = 1;
    document.getElementById('score-container').style.visibility = "visible";
    document.getElementById('score-display').innerHTML = score;
    document.getElementById('level-top').innerHTML = currentLevel;
    document.getElementById('level-status-container').style.visibility = "visible";
    initialiseLevel();
    generateQuestionIDs();
    initialiseQuestion();
}
function initialiseLevel() {
    // Initialise level question options - if the user answers a question incorrectly and the game is restarted these will be used to repopulate levelOptions
    const level1Range = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
    const level2Range = [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44];
    const level3Range = [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66];
    const level4Range = [67,68,69,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88];
    const level5Range = [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110];
    const level6Range = [111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,131,132];
    const level7Range = [133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154];
    const level8Range = [155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176];
    const level9Range = [177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198];
    const level10Range = [199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220];
 
    switch(currentLevel) {
        case 1:
            levelOptions = level1Range;
            levelQuestion = 1;
            break;
        case 2:
            levelOptions = level2Range;
            break;
        case 3:
            levelOptions = level3Range;
            break;
        case 4:
            levelOptions = level4Range;
            break;
        case 5:
            levelOptions = level5Range;
            break;
        case 6:
            levelOptions = level6Range;
            break;
        case 7:
            levelOptions = level7Range;
            break;
        case 8:
            levelOptions = level8Range;
            break;
        case 9:
            levelOptions = level9Range;
            break;
        case 10:
            levelOptions = level10Range;
            break;
        default:
            console.log('An error has occured when initialising the level');
    }
}
// This function picks three question IDs out of the level array, 1 correct answer and 2 incorrect answers. It removes these question from the array ensuring they do not reappear again during the game.
function generateQuestionIDs() {
    //Correct answer
    currentAnswerIndex = Math.floor(Math.random() * levelOptions.length);
    currentCorrectAnswerID = levelOptions[currentAnswerIndex];
    levelOptions.splice(currentAnswerIndex, 1);
    // 1st incorrect answer
    currentAnswerIndex = Math.floor(Math.random() * levelOptions.length);
    currentIncorrectAnswer1ID = levelOptions[currentAnswerIndex];
    levelOptions.splice(currentAnswerIndex, 1);
    // 2nd incorrect answer
    currentAnswerIndex = Math.floor(Math.random() * levelOptions.length);
    currentIncorrectAnswer2ID = levelOptions[currentAnswerIndex];
    levelOptions.splice(currentAnswerIndex, 1);
}
function initialiseQuestion(){
    if(questionType == 1) {
       questionType = questionType + 1;
       questionType1();
    }
    else {
        questionType = questionType - 1;
        questionType2();
    }
}
function questionType1() {
    let correctCountryObject = questions.find(question => question.id == currentCorrectAnswerID);
    let incorrectCountry1Object = questions.find(question => question.id == currentIncorrectAnswer1ID);
    let incorrectCountry2Object = questions.find(question => question.id == currentIncorrectAnswer2ID);
    questionImagePath = correctCountryObject.flagFile;
    correctAnswerPosition = (Math.floor(Math.random() * 3) + 1);
    switch(correctAnswerPosition) {
        case 1:
            button1Text = correctCountryObject.countryName;
            button2Text = incorrectCountry1Object.countryName;
            button3Text = incorrectCountry2Object.countryName;
            break;
        case 2:
            button1Text = incorrectCountry1Object.countryName;
            button2Text = correctCountryObject.countryName;
            button3Text = incorrectCountry2Object.countryName;
            break;
        case 3:
            button1Text = incorrectCountry1Object.countryName;
            button2Text = incorrectCountry2Object.countryName;
            button3Text = correctCountryObject.countryName;
            break;
    }
    outerContainer.innerHTML = `
    <div id="typeA-container" class="question-inner-container">
        <form class="typeA-question-form">
            <img class="typeA-flag" src="assets/images/flags/${questionImagePath}">
            <span class="typeA-question-heading">This is the flag of . . .</span>
            <button type='button' id="buttonAnswer1" value="1">
                ${button1Text}
            </button>
            <button type='button' id="buttonAnswer2" value="2">
                ${button2Text}
            </button>
            <button type='button' id="buttonAnswer3" value="3">
                ${button3Text}
            </button>
        </form>
    </div>
    `;
    document.getElementById("buttonAnswer1").addEventListener("click", function() {
        answerSelected = 1;
        checkAnswer();
    });
    document.getElementById("buttonAnswer2").addEventListener("click", function() {
        answerSelected = 2;
        checkAnswer();
    });
    document.getElementById("buttonAnswer3").addEventListener("click", function() {
        answerSelected = 3;
        checkAnswer();
    });
}
function questionType2() {
    let correctCountryObject = questions.find(question => question.id == currentCorrectAnswerID);
    let incorrectCountry1Object = questions.find(question => question.id == currentIncorrectAnswer1ID);
    let incorrectCountry2Object = questions.find(question => question.id == currentIncorrectAnswer2ID);
    questionCountryName = correctCountryObject.countryName;
    correctAnswerPosition = (Math.floor(Math.random() * 3) + 1);
    switch(correctAnswerPosition) {
        case 1:
            button1Flag = correctCountryObject.flagFile;
            button2Flag = incorrectCountry1Object.flagFile;
            button3Flag = incorrectCountry2Object.flagFile;
            break;
        case 2:
            button1Flag = incorrectCountry1Object.flagFile;
            button2Flag = correctCountryObject.flagFile;
            button3Flag = incorrectCountry2Object.flagFile;
            break;
        case 3:
            button1Flag = incorrectCountry1Object.flagFile;
            button2Flag = incorrectCountry2Object.flagFile;
            button3Flag = correctCountryObject.flagFile;
            break;
    }
    outerContainer.innerHTML = `
    <div id="typeB-container" class="question-inner-container">
        <form class="typeB-question-form">
            <span class="typeB-question-heading">What is the flag of <br>${questionCountryName}?</span>
            <button type='button' id="buttonAnswer1" value="A">
                <img src="assets/images/flags/${button1Flag}">
            </button>
            <button type='button' id="buttonAnswer2" value="B">
                <img src="assets/images/flags/${button2Flag}">
            </button>
            <button type='button' id="buttonAnswer3" value="C">
                <img src="assets/images/flags/${button3Flag}">
            </button>
        </form>
    </div>
    `;
    document.getElementById("buttonAnswer1").addEventListener("click", function() {
        answerSelected = 1;
        checkAnswer();
    });
    document.getElementById("buttonAnswer2").addEventListener("click", function() {
        answerSelected = 2;
        checkAnswer();
    });
    document.getElementById("buttonAnswer3").addEventListener("click", function() {
        answerSelected = 3;
        checkAnswer();
    });
}
function checkAnswer() {
    if(answerSelected === correctAnswerPosition) {
        correctAnswerSound();
        score = score + 1;
        currentQuestion++;
        updateScoreText();
        progressRingPercent = progressRingPercent + 14;
        updateProgressRing(progressRingPercent);
        document.getElementById('buttonAnswer' + answerSelected).style.animation = 'correctAnswer 1.1s ease-in-out';
        document.getElementById('buttonAnswer' + answerSelected).addEventListener('animationend', function() {
        questionModalRemove();
        });
    }
    else {
        incorrectAnswerSound();
        document.getElementById('buttonAnswer' + answerSelected).style.animation = 'incorrectAnswer 0.9s ease-in-out 1';
        document.getElementById('buttonAnswer' + answerSelected).addEventListener('animationend', function() {
            document.getElementById('buttonAnswer' + correctAnswerPosition).style.animation = 'correctAnswer 1.1s ease-in-out 1'
             document.getElementById('buttonAnswer' + correctAnswerPosition).addEventListener('animationend', function() {
             gameOver();
             });
        });
    }
}
function questionModalRemove() {
    document.getElementById("buttonAnswer1").removeEventListener("click", function() {
        answerSelected = 1;
        checkAnswer();
    });
    document.getElementById("buttonAnswer2").removeEventListener("click", function() {
        answerSelected = 2;
        checkAnswer();
    });
    document.getElementById("buttonAnswer3").removeEventListener("click", function() {
        answerSelected = 3;
        checkAnswer();
    });
    outerContainerClear();
    checkLevel();
    //const typeA = document.getElementById('typeA-container');
    //typeA.style.animation = 'remove-modal 0.2s ease-in-out';
    //typeA.style.animationIterationCount = "1";
    //setTimeout(() => outerContainerClear(), 200);
}
function checkLevel () {
    switch(score) {
        case 7:
            levelUp();
        break;
        case 14:
            levelUp();
        break;
        case 21:
            levelUp();
        break;
        case 28:
            levelUp();
        break;
        case 35:
            levelUp();
        break;
        case 42:
            levelUp();
        break;
        case 49:
            levelUp();
        break;
        case 56:
            levelUp();
        break;
        case 63:
            levelUp();
        break;
        case 70:
            gameWinner();
        break;
    default:
        generateQuestionIDs();
        initialiseQuestion();
    }
}
// Sound Functions
document.getElementById("mute-btn").addEventListener("click", function(){soundStatus();});
    // This function determines whether the player has enabled or disabled sounds
function soundStatus() {
    if (soundEnabled == true) {
        document.getElementById("mute-btn").style.backgroundImage='url("../assets/images/sound_disabled.png")';
        soundEnabled = !soundEnabled;
    }   else { 
        document.getElementById("mute-btn").style.backgroundImage='url("../assets/images/sound_enabled.png")';
        soundEnabled = !soundEnabled;
    }
}
    //These functions play a sound when called
function correctAnswerSound() {
    if (soundEnabled == true) {
        let sound = new Audio('assets/sounds/correct.mp3');
        sound.play();
    }
}
function incorrectAnswerSound() {
    if (soundEnabled == true) {
        let sound = new Audio('assets/sounds/incorrect_gameover.mp3');
        sound.play();
    }
}
function levelUpSound() {
    if (soundEnabled == true) {
        let sound = new Audio('assets/sounds/level_up.mp3');
        sound.play();
    }
}
function updateScoreText() {
    let scoreText = document.getElementById("score-display");
    scoreText.innerHTML = score;
}
// This controls the status of the level progress ring. Arguements 0-100
function updateProgressRing(percent) {
    let progressRing = document.getElementById("level-progress-ring");
    const progressRingCircumference = 24 * 2 * Math.PI;
    progressRing.style.strokeDasharray = `${progressRingCircumference} ${progressRingCircumference}`;
    progressRing.style.strokeDashoffset = `${progressRingCircumference}`;
    const offset = progressRingCircumference - percent / 100 * progressRingCircumference ;
    progressRing.style.strokeDashoffset = offset;
}
// Level up - creates div, plays animation, updates variables, deletes div on animaion completition 
function levelUp() {
    outerContainer.innerHTML = `
    <div id="level-up-container">
        <div id="level-up-text">Level Up!</div>
        <div id="level-up-spinner"></div>
    </div>
    `;
    currentLevel = currentLevel + 1;
    console.log(currentLevel);
    let levelTop = document.getElementById('level-top');
    levelTop.innerHTML = currentLevel;
    progressRingPercent = 1;
    updateProgressRing(1);
    let levelupContainer = document.getElementById('level-up-container');
    let levelupSpinner = document.getElementById('level-up-spinner');
    levelUpSound();
    levelupSpinner.style.animation = "levelup-spin 7s linear";
    levelupContainer.style.animation = "levelup 2s linear";
    levelupContainer.addEventListener('animationend', () => {
        outerContainer.innerHTML = "";
        initialiseLevel();
        generateQuestionIDs();
        initialiseQuestion();
    });    
}
function gameWinner() {
    alert('Game won!');
}
function gameOver() {
    checkHighScore();
    saveScore();
    outerContainer.innerHTML = `
    <div id="game-over-cont">
    <span id="game-over-text">Game Over!</span>
    <span id="game-over-scored">You scored: ${score} points</span>
    <span id="game-over-scored">Current high score: ${highScore} points</span>
    <button type="button" id="game-over-play-again">Play Again</button>
    <button type="button" id="game-over-main-menu">Main Menu</button>
    </div>
    `;
    document.getElementById("game-over-play-again").addEventListener("click", enterPlayerContainer);
    document.getElementById("game-over-main-menu").addEventListener("click", function() {
        document.getElementById("game-over-cont").remove;
        mainMenuLoad();
    });
}
function checkHighScore() {
    if(score > Math.floor(highScore)) {
        localStorage.setItem("highScore", score);
        localStorage.setItem("highScorePlayer", playerName);
    }
}
function saveScore() {
    if(localStorage.getItem("scores") == null)  {
        let scoreToSet = [
            {player: playerName, gameScore: score}
        ];
        localStorage.setItem("scores", JSON.stringify(scoreToSet));
    }
    else {
        let arrayScores = JSON.parse(localStorage.getItem("scores"));
        console.log(arrayScores);
        arrayScores.push({player: playerName, gameScore: score});
        console.log(arrayScores);
        localStorage.setItem("scores", JSON.stringify(arrayScores));
    }
}
function outerContainerClear (){
    outerContainer.innerHTML = "";
}
function loadScoresUI() {
    let noScores = "";
    if(localStorage.getItem("scores") == null) {
        noScoresUI();
    }
    else {
        createScoreTableUI() ;
        document.getElementById("clear-scores").addEventListener("click", clearScores);
    }
    document.getElementById("back-button").addEventListener("click", returnMainMenu);
}
function noScoresUI() {
    let controlBar = document.getElementById('control-bar');
    controlBar.remove();
    outerContainer.innerHTML = "";
    let lsHighScore = localStorage.getItem('highScore');
    let newScoresUI = document.createElement('div');
    newScoresUI.id = 'scores-how-to-cont';
    body.appendChild(newScoresUI);
    newScoresUI.innerHTML = `
    <div id="scores-inner-cont">
        <button type="button" id="back-button" aria-label="Back to Main Menu"></button>
        <span id="scores-heading">Scores</span>
        <div id="score-statement">No scores to show.</div>
    </div>
    `; 
}
function createScoreTableUI() {
    let controlBar = document.getElementById('control-bar');
    controlBar.remove();
    outerContainer.innerHTML = "";
    let lsHighScore = localStorage.getItem('highScore');
    let newScoresUI = document.createElement('div');
    newScoresUI.id = 'scores-how-to-cont';
    body.appendChild(newScoresUI);
    newScoresUI.innerHTML = `
    <div id="scores-inner-cont">
        <button type="button" id="back-button" aria-label="Back to Main Menu"></button>
        <span id="scores-heading">Scores</span>
        <div id="score-statement"><span>Player001</span> has the highest score of <span>${lsHighScore}</span> points.</div>
        <table id="score-table">
            <tr>
                <th>Player</th>
                <th>Points</th>
            </tr>
        </table>
        <button id="clear-scores" type="button">Clear Scores</button>
    </div>
    `;
    populateScoresTable();
}
function populateScoresTable(){
    let arrayScores = JSON.parse(localStorage.getItem("scores"));
    let scoreTable = document.getElementById('score-table');
    for(let arrayItem = 0; arrayItem < arrayScores.length; arrayItem++) {
        let row = (arrayScores[arrayItem]);
        let tablePlayer = (row.player);
        let tableScore = (row.gameScore);
        let newRow = document.createElement('tr');
        newRow.innerHTML =  `<td>${tablePlayer}</td><td>${tableScore}</td>`;
        scoreTable.appendChild(newRow);
    }
}
function clearScores(){
    localStorage.removeItem('scores');
    localStorage.removeItem('highScore');
    document.getElementById('score-statement').innerHTML = "No scores to show.";
    document.getElementById('score-table').remove;
    document.getElementById('clear-scores').remove;
}
function returnMainMenu() {
    let scoresHowToCont = document.getElementById('scores-how-to-cont');
    scoresHowToCont.remove();
    let controlBar = document.createElement('div');
    controlBar.id = 'control-bar';
    body.appendChild(controlBar);
    controlBar.innerHTML = `
    <div id="mute-container"><button id="mute-btn" aria-label="Toggle Sound effects"></button></div>
    <div id="level-status-container">
        <div id="level-label">Level</div>
        <div id="level-ring-container">
            <div id="level-top">1</div>
            <svg width="52px" height="52px">
                <circle id="level-ring-background" cx="26px" cy="26px" r="24px"/>
                <circle id="level-progress-ring" cx="26px" cy="26px" r="24px"/>
            </svg>
        </div>
    </div>
    <div id="score-container">
        <span id="score-display">0</span>
        <img src="assets/images/score_icon.svg"alt="Score Symbol">
    </div>
    `;
    mainMenuLoad();
}