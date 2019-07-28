/* 
    A simple BlackJack game
    Choose to 
*/

// Card variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack',
    'Ten', 'Nine', 'Eight', 'Seven', 'Six',
    'Five', 'Four', 'Three', 'Two']

// DOM Variables
let textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button');

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = []

function createDeck(){
    let deck = []
    for (i = 0; i < values.length; i++){
        for (j = 0; j < suits.length; j++){
            let card = {
                suit: suits[j],
                value: values[i],
            }
            deck.push(card)
        }
    }
    return deck
}

function getNextCard() {
    return deck.shift();
}

function printCard(card){
    return card.value + " of " + card.suit;
}

function showStatus(){
    if (!gameStarted){
        textArea.innerText = 'Welcome to Blackjack!'
    }
}

function shuffleDeck(deck){
    for (let i = 0; i < deck.length; i++){
        let swapIndex = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIndex];
        deck[swapIndex] = deck[i];
        deck[i] = tmp
    }
}

function updateScores(){
    dealerScore = getScore(dealerCards)
    playerScore = getScore(playerCards)
}

//Hide buttons to start
hitButton.style.display = 'none'
stayButton.style.display = 'none'
showStatus();

// New Game
newGameButton.addEventListener('click', function() {
    gameStarted = true
    gameOver = false
    playerWon = false

    deck = createDeck()
    shuffleDeck(deck)

    dealerCards = [getNextCard(), getNextCard()]
    playerCards = [getNextCard(), getNextCard()]

    newGameButton.style.display = 'none'
    hitButton.style.display = 'inline'
    stayButton.style.display = 'inline'
    showStatus();
})
