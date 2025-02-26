const resultText = document.querySelector("#result");
const choices = document.querySelectorAll(".choice");
const animationContainer = document.querySelector(".animationContainer");
const userScoreTxt = document.querySelector("#userscore");
const computerScoreTxt = document.querySelector("#computerscore");
const resetBtn = document.querySelector(".reset");

let computerScore = 0;
let userScore = 0;
let winLimit = 3;
let gameOver = false;

resetBtn.addEventListener("click", () => {
    resetGame();
})

function resetGame() {
    computerScore = 0;
    userScore = 0;
    userScoreTxt.textContent = userScore;
    computerScoreTxt.textContent = computerScore;
    userScoreTxt.classList.remove("winner");
    computerScoreTxt.classList.remove("winner");
    resultText.textContent = "The game has been restarted! Good luck!";
    gameOver = false;
    resetBtn.classList.remove("visible");
    animationContainer.classList.remove("visible");
}

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        if (gameOver) {
            return;
        }
        const userChoice = choice.id;
        const computerChoice = getComputerChoice();
        const result = getResult(userChoice, computerChoice);
        resultText.textContent = result;
        userScoreTxt.textContent = userScore;
        computerScoreTxt.textContent = computerScore;
        gameOver = isGameOver();
    })
})

function getComputerChoice() {
    const choices = [`rock`, "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie! Both chose " + computerChoice + "...";
    } else if (userChoice === "rock" && computerChoice === "scissors" || userChoice === "paper" && computerChoice === "rock" || userChoice === "scissors" && computerChoice === "paper") {
        userScore++;
        return `You won this round with your ${userChoice} against the computers ${computerChoice}!`;
    } else {
        computerScore++;
        return `The computer won this round with its ${computerChoice} against your ${userChoice}!`;
    }
}

function isGameOver() {

    if (userScore === winLimit || computerScore === winLimit) {
        resetBtn.classList.add("visible");
        if (userScore > computerScore) {
            animationContainer.classList.toggle("visible");
            userScoreTxt.classList.toggle("winner");
            resultText.textContent = "CONGRATULATIONS! YOU BEAT THE COMPUTER!!!!";
            return true;
        } else {
            resultText.textContent = "You were beaten by the machine. So sorry :( ";
            computerScoreTxt.classList.toggle("winner");
            return true;
        }

    } else {
        return false;
    }

}