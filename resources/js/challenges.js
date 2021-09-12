'use strict';

// decide the variables
var dice, playingState, currentScore, scores, activePlayer;

// Doing the initial setup
init();

// Challenge - 1
var lastDiceScore;

// Constants
var DICE_CLASS = document.querySelector('.dice');

// Initialize
function init() {
    playingState = true;
    currentScore = 0;
    scores = [0, 0];
    activePlayer =  0;
    
    // At the time of the start
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;   
}

function nextPlayer() {
    // Change the player
    currentScore = 0;
    document.getElementById('current--' + activePlayer).textContent = currentScore;
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;   
}

// Event - Rolling
document.querySelector('.btn--roll').addEventListener('click', () => 
    {
        if(playingState){
            // Generate Random Number
            dice = Math.floor(Math.random() * 6) + 1;  

            // Display the random number
            DICE_CLASS.style.display = 'block';
            DICE_CLASS.src = 'resources/images/dice-' + dice + '.png';

            // Add currentScore if dice does not give 1 - Player change
            if(lastDiceScore === 6 && dice === 6) {
                // Player loses score
                scores[activePlayer] = 0;
                document.getElementById('score--' + activePlayer).textContent = '0';
                
                // Next Player
                nextPlayer();
                
            } else if(dice > 1){
                currentScore += dice;
                document.getElementById('current--' + activePlayer).textContent = currentScore;
            } else {
               // Next Player
                nextPlayer();
            }
            lastDiceScore = dice;
        }
});

// Event - Hold
document.querySelector('.btn--hold').addEventListener('click', () => 
    {
        if(playingState){
            // Add the currentScore to scores of each player
            scores[activePlayer] += currentScore;
            document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];

            // Check for winner - Hide the dice, show the winner
            var input = document.querySelector('.winning--score').value;
            
            if(scores[activePlayer] >= (input === true ? input : 20)) {
                document.getElementById('name--' + activePlayer).textContent = 'Winner!';
                playingState = false;
            } else {
                // Next Player
                nextPlayer();
            }
        }
});

// Event - New Game
document.querySelector('.btn--new').addEventListener('click', init);