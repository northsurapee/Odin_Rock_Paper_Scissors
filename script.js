        function getComputerChoice() {
            const choices = ["Rock", "Paper" , "Scissors"]
            let randomIndex = Math.floor(Math.random() * choices.length)
            return choices[randomIndex]
        }

        function playRound(playerSelection, computerSelection) {
            // Status of round (0:com win, 1:tie, 2:player win)
            let roundStatus;
            let roundMessage;

            // Make playerSelection case-insensitive
            playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase()

            // Game Logic
            if ((playerSelection === "Rock" && computerSelection === "Scissors") ||
                (playerSelection === "Paper" && computerSelection === "Rock") ||
                (playerSelection === "Scissors" && computerSelection === "Paper")) {
                roundStatus = 2;
                roundMessage = `You Win! ${playerSelection} beats ${computerSelection}`;
            } else if (playerSelection === computerSelection) {
                roundStatus = 1;
                roundMessage = "It's a tie!";
            } else {
                roundStatus = 0;
                roundMessage = `Computer Wins! ${computerSelection} beats ${playerSelection}`;
            }

            return { roundStatus, roundMessage };
        }

        function game() {
            // total rounds
            const rounds = 5;
            let playerScore = 0;
            let computerScore = 0;
            let playerSelection;
            let roundStatus;
            let roundMessage;

            for (let i = 0; i < rounds; i++) {
                // Get input from user
                playerSelection = prompt("What is your selection?");
                const roundResult = playRound(playerSelection, getComputerChoice());
                roundStatus = roundResult.roundStatus;
                roundMessage = roundResult.roundMessage;

                switch (roundStatus) {
                    case 0:
                        computerScore += 1;
                        break;
                    case 1:
                        // tie
                        break;
                    case 2:
                        playerScore += 1;
                        break;
                }

                console.log(roundMessage);
            }

            if (playerScore > computerScore) {
                console.log("Game Result : Player wins!");
            } else if (playerScore < computerScore) {
                console.log("Game Result : Computer wins!");
            } else {
                console.log("Game Result : Tie!");
            }
        }

        // Run the game
        game()