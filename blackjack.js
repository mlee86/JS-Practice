const fs = require("fs");
const chalk = require("chalk");
var inquirer = require("inquirer");

let suits = ["♠", "♣", "♥", "♦"];
let cards = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
let playerScore = 0;
let dealerScore = 0;
let playerCards = [];
let dealerCards = [];
let banner =
  chalk.black("♠") +
  " " +
  chalk.red("♥") +
  " " +
  chalk.black("♣") +
  " " +
  chalk.red("♦");
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

function dealCards(player) {
  let index = parseInt(Math.random() * deck.length);
  player.push(deck[index]);
  deck.splice(index, 1);
}

let deck = createDeck();
let hiddenCard = "🃏";

function getCards(card) {
  let deckCard = [];
  if (card.suit === "♠" || card.suit === "♣") {
    deckCard.push(chalk.black.bgWhite(card.value + "" + card.suit));
  } else {
    deckCard.push(chalk.red.bgWhite(card.value + "" + card.suit));
  }
  return deckCard;
}

function updateScores() {
  playerScore = getScore(playerCards);
  dealerScore = getScore(dealerCards);
}
function updatedPlayerScore() {
  playerScore = getScore(playerCards);
  dealerScore = getCardValue(dealerCards[1]);
  if (dealerScore === 1) {
    dealerScore += 10;
  }
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
function startGame() {
  dealCards(playerCards);
  dealCards(dealerCards);
  dealCards(playerCards);
  dealCards(dealerCards);
}

function playGame() {
  let playerTurn = 1;
  let dealerTurn = 1;
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: chalk.bgWhite.black(
          "\n" + banner,
          banner,
          banner,
          banner,
          banner,
          "\nWelcome to Blackjack! What is your name?\n" + banner,
          banner,
          banner,
          banner,
          banner,
          "\n"
        )
      }
    ])
    .then(function(player) {
      console.log(
        chalk.bgWhite.black(
          `${banner}Thanks ${player.name}! Good luck to you!${banner}`
        )
      );
      startGame();
      updatedPlayerScore();
      console.log(`${player.name} has been dealt: 
    ${getCards(playerCards[0])}  ${getCards(playerCards[1])}
    ${player.name} has ${playerScore}

    The Dealer has been dealt: 
    ${hiddenCard}  ${getCards(dealerCards[1])}
    The Dealer has ${dealerScore}`);
      function ask() {
        inquirer
          .prompt([
            {
              type: "list",
              name: "action",
              message: chalk.bgWhite.black(
                `\nYou currently have ${playerScore} \nWould you like to hit or stay?`
              ),
              choices: ["Hit", "Stay"]
            }
          ])
          .then(function(response) {
            if (response.action === "Hit") {
              dealCards(playerCards);
              console.log(
                `${player.name} was dealt ${getCards(
                  playerCards[playerTurn + 1]
                )}`
              );
              updatedPlayerScore();
              console.log(
                `${player.name} now has ${playerScore} and the dealer has ${dealerScore}`
              );
              playerTurn++;
              if (playerScore <= 21) {
                ask();
              } else {
                whoWins();
              }
            } else if (response.action === "Stay" && dealerScore < 17) {
              updateScores();
              console.log(`The Dealer has been dealt: 
          ${getCards(dealerCards[0])}  ${getCards(
                dealerCards[1]
              )}\nThe Dealer has ${dealerScore}`);
              if (dealerScore < 17) {
                while (dealerScore < 17) {
                  dealCards(dealerCards);
                  updateScores();
                  console.log(
                    `The dealer was dealt ${getCards(
                      dealerCards[dealerTurn + 1]
                    )}`
                  );
                  console.log(
                    `${player.name} has ${playerScore} and the dealer now has ${dealerScore}`
                  );
                  dealerTurn++;
                  whoWins();
                }
              } else {
                whoWins();
              }
            } else if (response.action === "Stay" && dealerScore >= 17) {
              whoWins();
            }
          });
      }
      ask();
      function whoWins() {
        if (playerScore > 21) {
          console.log(`${player.name} has busted!`);
          console.log("The Dealer has won");
        } else if (dealerScore > 21) {
          console.log("The Dealer has busted!");
          console.log(`${player.name} has won`);
        } else if (playerScore <= 21 && dealerScore < 17) {
          return;
        } else if (playerScore > dealerScore) {
          console.log(`${player.name} has won`);
        } else if (playerScore < dealerScore) {
          console.log("The Dealer has won");
        } else {
          console.log("It's a push! The game is a tie!");
        }
      }
    });
}

playGame();
