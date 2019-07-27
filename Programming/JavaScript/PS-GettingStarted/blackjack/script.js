/* 
    A simple BlackJack game
    Choose to 
*/

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack',
    'Ten', 'Nine', 'Eight', 'Seven', 'Six',
    'Five', 'Four', 'Three', 'Two']


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

function getNextCard(deck) {
    return deck.pop()
}

function printCard(card){
    return card.values + " of " + card.suit;
}

// Link to HTML elements
let textArea = document.getElementById('text-area')
let newGameButton = document.getElementById('new-game-button')
let hitButton = document.getElementById('hit-button')
let stayButton = document.getElementById('stay-button')

//Hide buttons to start
hitButton.style.display = 'none'
stayButton.style.display = 'none'

newGameButton.addEventListener('click', function() {
    textArea.innerText = 'Started...'
    newGameButton.style.display = 'none'
    hitButton.style.display = 'inline'
    stayButton.style.display = 'inline'
})

let myDeck = createDeck()

let playerCards = []
let houseCards = []