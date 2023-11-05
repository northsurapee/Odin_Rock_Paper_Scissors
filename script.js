// GAME LOGIC 

/* global scope variable, So we can call it from anywhere */
let playerScore = 0
let computerScore = 0
let roundWinner = ''

/* get roundWinner and update score */
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        roundWinner = "tie"
    }
    if (
        (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') ||
        (playerSelection === 'PAPER' && computerSelection === 'ROCK')
    ) {
        playerScore++
        roundWinner = 'player'
      }
      if (
        (computerSelection === 'ROCK' && playerSelection === 'SCISSORS') ||
        (computerSelection === 'SCISSORS' && playerSelection === 'PAPER') ||
        (computerSelection === 'PAPER' && playerSelection === 'ROCK')
    ) {
        computerScore++
        roundWinner = 'computer'
    }
}

function getRandomChoice() {
    const choices = ['ROCK', 'PAPER' , 'SCISSORS']
    let randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex]
}

function isGameOver() {
    return playerScore === 5 || computerScore === 5
}

// USER INTERFACE
/* create reference variable to DOM element */
const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const playerSign = document.getElementById('playerSign')
const computerSign = document.getElementById('computerSign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

// ADD EVENT LISTENER
/* use arrow function for more general click eveet is triggered, 
   the arrow func is executed. This arrow function, in turn, calls the handleClick("Rock") */
rockBtn.addEventListener('click', () => handleClick('ROCK'))
paperBtn.addEventListener('click', () => handleClick('PAPER'))
scissorsBtn.addEventListener('click', () => handleClick('SCISSORS'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
    // Prevent overscoring
    if (isGameOver()) {
        openEndgameModal()
        return
    }
    // game logic
    const computerSelection = getRandomChoice()
    playRound(playerSelection, computerSelection)
    // update UI according to game logic
    updateScoreInfo()
    updateScoreMessage(roundWinner, playerSelection, computerSelection)
    updateChoices(playerSelection, computerSelection)
    updateCurrentScore()
    // Is game end ?
    if (isGameOver()) {
        openEndgameModal()
        setFinalMessage()
    }
}

function updateScoreInfo() {
    if (roundWinner === 'tie') {
      scoreInfo.textContent = "It's a tie!"
    } else if (roundWinner === 'player') {
      scoreInfo.textContent = 'You won!'
    } else if (roundWinner === 'computer') {
      scoreInfo.textContent = 'You lost!'
    }
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
    if (winner === 'player') {
      scoreMessage.textContent = `${capitalizeFirstLetter(playerSelection)} 
                                  beats ${computerSelection.toLowerCase()}`
      return
    }
    if (winner === 'computer') {
      scoreMessage.textContent = `${capitalizeFirstLetter(playerSelection)} 
                                  is beaten by ${computerSelection.toLowerCase()}`
      return
    }
  
    scoreMessage.textContent = `${capitalizeFirstLetter(playerSelection)} 
                                ties with ${computerSelection.toLowerCase()}`
}

function updateChoices(playerSelection, computerSelection) {
    switch (playerSelection) {
      case 'ROCK':
        playerSign.textContent = '✊'
        break
      case 'PAPER':
        playerSign.textContent = '✋'
        break
      case 'SCISSORS':
        playerSign.textContent = '✌'
        break
    }
  
    switch (computerSelection) {
      case 'ROCK':
        computerSign.textContent = '✊'
        break
      case 'PAPER':
        computerSign.textContent = '✋'
        break
      case 'SCISSORS':
        computerSign.textContent = '✌'
        break
    }
}   

function updateCurrentScore() {
    playerScorePara.textContent = `Player: ${playerScore}`
    computerScorePara.textContent = `Computer: ${computerScore}`
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() // []
}

// UI : MODAL
/* don't understand shit */
function openEndgameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
}
  
function closeEndgameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}
  
function setFinalMessage() {
    return playerScore > computerScore ? 
           (endgameMsg.textContent = 'You won!')
           :(endgameMsg.textContent = 'You lost...')
}
  
function restartGame() {
    playerScore = 0
    computerScore = 0
    scoreInfo.textContent = 'Choose your weapon'
    scoreMessage.textContent = 'First to score 5 points wins the game'
    playerScorePara.textContent = 'Player: 0'
    computerScorePara.textContent = 'Computer: 0'
    playerSign.textContent = '?'
    computerSign.textContent = '?'
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}
