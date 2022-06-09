let currentQuestion = 1;
let questionType = 1;
let levelRound = 1;
let currentAnswerIndex = 0;
let currentCorrectAnswerID = 0;
let currentIncorrectAnswer1ID = 0;
let currentIncorrectAnswer2ID = 0;
// Initialise level question options - if the user answers a question incorrectly and the game is restarted level1Range will be used to repopulate level1Options
const level1Range = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
let level1Options = level1Range;

function spliceArray() {
    currentAnswerIndex = Math.floor(Math.random() * level1Options.length);
    currentCorrectAnswerID = level1Options[currentAnswerIndex];
    level1Options.splice(currentAnswerIndex, 1);


    currentAnswerIndex = Math.floor(Math.random() * level1Options.length);
    currentIncorrectAnswer1ID = level1Options[currentAnswerIndex];
    level1Options.splice(currentAnswerIndex, 1);

    currentAnswerIndex = Math.floor(Math.random() * level1Options.length);
    currentIncorrectAnswer2ID = level1Options[currentAnswerIndex];
    level1Options.splice(currentAnswerIndex, 1);
    levelRound++;
    console.log('Array items', level1Options.length);
    console.log('Level round', levelRound);
}
spliceArray();
spliceArray();
spliceArray();
spliceArray();
spliceArray();