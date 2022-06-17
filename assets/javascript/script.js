/* jshint esversion: 11 */

//Global Scope Variables
let body = document.body;
let currentQuestion = 1;
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
let levelOptions = [];
let answerSelected = null;
let soundEnabled = true;
let playerName = 'player001'
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
   document.getElementById("main-play").addEventListener("click", newGame);
}
function newGame() {
    document.getElementById("main-play").removeEventListener("click", newGame);
    outerContainer.innerHTML = "";
    currentLevel = 1;
    currentQuestion = 1;
    updateProgressRing(1);
    //initialiseLevel;
    //initialiseQuestion;
    questionType = 1;
    document.getElementById('score-container').style.visibility = "visible";
    document.getElementById('level-status-container').style.visibility = "visible";
    initialiseLevel();
    generateQuestionIDs();
    initialiseQuestion();
}
function initialiseLevel() {
    // Initialise level question options - if the user answers a question incorrectly and the game is restarted these will be used to repopulate levelOptions
    const level1Range = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
    const level2Range = [23,24,25,26,27,28.29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44];
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
       questionType1();
    }
    else {
        questionType2();
    }
}
function questionType1() {
    let correctCountryObject = questions.find(question => question.id === currentCorrectAnswerID);
    let incorrectCountry1Object = questions.find(question => question.id === currentIncorrectAnswer1ID);
    let incorrectCountry2Object = questions.find(question => question.id === currentIncorrectAnswer2ID);
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
    });
    document.getElementById("buttonAnswer1").addEventListener("click", function() {
        answerSelected = 2;
    });
    document.getElementById("buttonAnswer1").addEventListener("click", function() {
        answerSelected = 3;
    });
    checkAnswer();
}

function questionType2() {
    correctAnswerPosition = (Math.floor(Math.random() * 3) + 1);
}
function checkAnswer();

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
    <div id="home-screen">
       <h1>Flags &<br>Countries</h1>
       <h2>The Geography Game</h2>
       <img src="assets/images/globe.png">
       <div id="main-menu-buttons-flex">
        <button type="button" id="main-play">Play</button>
        <button type="button" id="main-scores">Scores</button>
        <button type="button" id="main-how-to-play">How to Play</button>
       </div>
   </div>
    `;
    currentLevel++;
    let levelTop = document.getElementById('level-top');
    levelTop.innerHTML = currentLevel;
    updateProgressRing(1);
    let levelupContainer = document.getElementById('level-up-container');
    levelUpSound();
    levelupContainer.style.animation = "levelup 2s linear";
    levelupContainer.addEventListener('animationend', () => {
        outerContainer.innerHTML = "";
    });
}
function gameOver() {
    outerContainer.innerHTML = `
    <div id="game-over-cont">
    <span id="game-over-text">Game Over!</span>
    <span id="game-over-scored">You scored: 28 points</span>
    <button type="button" id="game-over-play-again">Play Again</button>
    <button type="button" id="game-over-main-menu">Main Menu</button>
    </div>
    `;
    let gameOverCont = document.getElementById('game-over-cont');
    gameOverCont.style.animation = "gameOver 0.4s linear";
}
