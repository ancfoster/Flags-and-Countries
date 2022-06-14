/* jshint esversion: 11 */
//Global Scope Variables
let currentQuestion = 1;
let currentLevel = null;
let questionType = 1;
let levelSet = 0;
let currentAnswerIndex = 0;
let currentCorrectAnswerID = 0;
let currentIncorrectAnswer1ID = 0;
let currentIncorrectAnswer2ID = 0;
let levelOptions = [];
let answerSelected = false;
let soundEnabled = true;


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
    levelSet = 0;

    switch(currentLevel) {
        case 1:
            levelOptions = level1Range;
            currentQuestion = 1;
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
    currentAnswerIndex = Math.floor(Math.random() * levelOptions.length);
    currentCorrectAnswerID = levelOptions[currentAnswerIndex];
    levelOptions.splice(currentAnswerIndex, 1);

    currentAnswerIndex = Math.floor(Math.random() * levelOptions.length);
    currentIncorrectAnswer1ID = levelOptions[currentAnswerIndex];
    levelOptions.splice(currentAnswerIndex, 1);

    currentAnswerIndex = Math.floor(Math.random() * levelOptions.length);
    currentIncorrectAnswer2ID = levelOptions[currentAnswerIndex];
    levelOptions.splice(currentAnswerIndex, 1);
    levelSet++;
    console.log('Array items', levelOptions.length);
    console.log('Level round', levelSet);
    console.log(levelOptions);
}

currentLevel = 5;
initialiseLevel();
generateQuestionIDs();

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