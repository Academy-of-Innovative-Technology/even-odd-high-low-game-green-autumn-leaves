const stats = {
    wins:0,
    losses:0,
    streak:0,
    retries:0,
    rounds:0
};


const round = {
    secretNumber:0,
    attempts: 0
};



function startNewRound(){
    round.secretNumber = Math.floor(Math.random() * 1001);
    round.attempts = 0;
    stats.rounds++;

    document.getElementById("feedback").innerText = "New round started!";
    updateStats();
}


startNewRound();


function makeGuess() {

    const guessInput = document.getElementById("guessInput");
    const guess = Number(guessInput.value);

    if (guessInput.value.trim() === "") {
        document.getElementById("feedback").innerText = "Please enter a number.";
        return;
    }

    round.attempts++;

    let message = `Attempt ${round.attempts}:`;

    if (guess < round.secretNumber) {
        message += "Too low!";
    } else if (guess >round.secretNumber){
        message += "Too high!";
    } else {
        message = `Correct! The number was ${round.secretNumber}.`;

        stats.wins++;
        stats.streak++;

        updateStats();
        startNewRound();
        return;
    }


    if (round.secretNumber % 2===0){
        message += "(HINT: The number is EVEN)";
    }  else {
        message += "(HINT: The number is ODD)";
    }

    document.getElementById("feedback").innerText = message;
}



function retryRound(){
    stats.losses++;
    stats.retries++;
    stats.streak = 0;

    document.getElementById("feedback").innerText =
    `You lost! The number was ${round.secretNumber}. Starting a new round...`;

    startNewRound();
}



function quitGame(){
    stats.losses++;
    stats.streak = 0;

    alert("Thanks for playing! Sending you to AOIT website.");
    window.location.href = "https://www.aoiths.org/";
}



function updateStats() {
    const box = document.getElementById("stats");

    box.innerText =
     `Wins: ${stats.wins}\n` +
    `Losses: ${stats.losses}\n` +
    `Retries: ${stats.retries}\n` +
    `Rounds Played: ${stats.rounds}\n` +
    `Current Streak: ${stats.streak}`;
}