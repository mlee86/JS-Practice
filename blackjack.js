let suits = ["♠️", "♣", "❤", "♦"];
let cards = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
let playerScore = 0;
let dealerScore = 0;

function createDeck() {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      let card = {
        suit: suits[i],
        value: cards[j]
      };
      deck.push(card);
    }
  }
  return deck;
}

function dealCard() {
  return deck[parseInt(Math.random() * deck.length)];
}

let deck = createDeck();

let playerCards = [dealCard(), dealCard()];
let dealerCards = [dealCard(), dealCard()];
function getCards(card) {
  return card.value + "" + card.suit;
}

function updateScores() {
  playerScore = getScore(playerCards);
  dealerScore = getScore(dealerCards);
}
function getCardValue(card) {
  switch (card.value) {
    case "A":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    default:
      return 10;
  }
}
function getScore(cardArray) {
  let score = 0;
  let aceInTheHole = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score = score + getCardValue(card);

    if (card.value === "A") {
      aceInTheHole = true;
    }
  }
  if (aceInTheHole && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

updateScores();
console.log(`The Player has been dealt: 
${getCards(playerCards[0])}  ${getCards(playerCards[1])}
The player has ${playerScore}

The Dealer has been dealt: 
${getCards(dealerCards[0])}  ${getCards(dealerCards[1])}
The Dealer has ${dealerScore}`);

if (playerScore > dealerScore) {
  console.log("The Player has won");
} else if (playerScore < dealerScore) {
  console.log("The Dealer has won");
} else {
  console.log("It's a push! The game is a tie!");
}
