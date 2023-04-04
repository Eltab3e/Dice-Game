/*
GAME RULES:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score.
- A player loses points IF:
    1: the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
    2: the player rolls two 6 in a row, he loses his ENTIRE score. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game.
- Add an input field to the HTML where players can set the winning score, so that they can change the predefined winning score of 100.

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice;

init();

//1- Roll dice button
document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    //1. Generate random number from 1 to 6
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'img/dice-' + dice + '.png';

    //3. A player loses his entire score if he rolls two 6 in a row
    if (dice === 6 && prevDice === 6) {
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } //4. Update the round score ONLY IF the rolled number was not 1
    else if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.getElementById('current-' + activePlayer).textContent =
        roundScore;
    } else {
      //Next player
      nextPlayer();
    }
    prevDice = dice;
  }
});

//2- Hold button
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    //1. Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    //2. Update the UI
    document.getElementById('score-' + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;

    //Undefined, 0, null or "" are COERCED to false
    //Anything else is COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //3. Check if the player won the game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById('name-' + activePlayer).textContent =
        'WINNER !!!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false;
    } else {
      //4. Next player
      nextPlayer();
    }
  }
});

//3- New game button
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  gamePlaying = true;
  //Set initial scores to 0
  scores = [0, 0];
  roundScore = 0;
  //Set default player to player 1
  activePlayer = 0;
  //Display initial scores values
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  //Hide dice at the beginning
  document.querySelector('.dice').style.display = 'none';
  //Set players names back to default
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  //Remove winner class
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  //Remove active class
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  //Add active class back to default player
  document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
  //Remove active state from current player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); // simple IF ELSE statement
  //Set current player score to 0
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  //Display active state to the next player and remove it from current player
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //Hide dice at the beginning of the next player turn
  document.querySelector('.dice').style.display = 'none';
}

//document.getElementById('current-' + activePlayer).textContent = dice;                    //Setter
//document.getElementById('current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';   //Setter
//var x = document.getElementById('current-' + activePlayer).textContent;                   //Getter
//console.log(x);
