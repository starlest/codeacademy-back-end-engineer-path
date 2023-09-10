let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

function generateTarget() {
    return Math.floor(Math.random() * 10);
}

function compareGuesses(userGuess, computerGuess, targetNumber) {
    if (userGuess > 9 || userGuess < 0) {
        alert("Number is out of range. Please select a number between 0 and 9.");
        return;
    }
    userResult = Math.abs(targetNumber - userGuess);
    computerResult = Math.abs(targetNumber - computerGuess);
    return userResult >= computerResult;
}

function updateScore(winner) {
    if (winner == 'human') humanScore += 1;
    else computerScore += 1;
}

function advanceRound() {
    currentRoundNumber += 1;
}