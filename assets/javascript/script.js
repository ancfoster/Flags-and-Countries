let currentQuestion = 1;
let questionType = 1;
let levelRound = 1;
// Initialise level question options - if the user answers a questionly incorrectly and the game is restarted level1Range will be used to repopulate level1Options
const level1Range = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
let level1Options = level1Range;

// This section ensures that any possible answers do not reappear in a single game. 
function level1removeoption() {
    // Determining the correct answer ID by randomly picking a value from the array
    currentQuestionCorrectAnswer = level1Range[Math.floor(Math.random() * level1Options.length)];
    //Removing the correct answer ID from the array so it does not re-appear
    level1Options.splice((currentQuestionCorrectAnswer -1), 1);
    console.log('Round', levelRound, 'Correct Answer =', currentQuestionCorrectAnswer);
    console.log('Array length', level1Options.length);
    // Determining the 1st incorrect answer ID for this round by randomly picking a value from the array
    currentQuestionIncorrectAnswer1 = level1Range[Math.floor(Math.random() * level1Options.length)];
    level1Options.splice((currentQuestionIncorrectAnswer1 - 1), 1);
    console.log('Round', levelRound, 'Incorrect Answer 1 =', currentQuestionIncorrectAnswer1);
    console.log('Array length', level1Options.length);
    // Determining the 2nd incorrect answer ID for this round by randomly picking a value from the array
    currentQuestionIncorrectAnswer2 = level1Range[Math.floor(Math.random() * level1Options.length)];
    level1Options.splice((currentQuestionIncorrectAnswer2 - 1), 1);
    console.log('Round', levelRound, 'Incorrect Answer 2 =', currentQuestionIncorrectAnswer2);
    console.log('Array length', level1Options.length);
    levelRound++
}
// Each level conists of 5 questions - executing the level 1 remove function 5 times. 
// Each time I refresh the browser 
level1removeoption();
level1removeoption();
level1removeoption();
level1removeoption();
level1removeoption();

// This assings which of the 3 answer buttons will represent the correct answer
currentQuestionCorrectOption = Math.floor(Math.random() * 3) + 1;

//console.log(currentQuestion);
//console.log(currentQuestionCorrectOption);
console.log(level1Options);