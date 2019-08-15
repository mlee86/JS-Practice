//Rock Paper Scissors game

const tools = ["rock", "paper", "scissors"];
//Keep track of scores
let score1 = 0;
let score2 = 0;

while (score1 !== 3 && score2 !== 3) {
  let player1 = tools[parseInt(Math.random() * tools.length)];
  let player2 = tools[parseInt(Math.random() * tools.length)];
  console.log(`Player 1 threw ${player1} and Player 2 threw ${player2}.`);

  if (player1 === player2) {
    if (score1 > score2) {
      console.log(
        `The game is tied, no points awarded. Player 1 is winning ${score1}-${score2}!`
      );
    } else if (score1 < score2) {
      console.log(
        `The game is tied, no points awarded. Player 2 is winning ${score2}-${score1}!`
      );
    } else {
      console.log(
        `The game is tied, no points awarded. the game is tied ${score1}-${score2}!`
      );
    }
  } else if (
    (player1 === "rock" && player2 === "scissors") ||
    (player1 === "paper" && player2 === "rock") ||
    (player1 === "scissors" && player2 === "paper")
  ) {
    score1++;
    if (score1 > score2) {
      console.log(`Player 1 has won, Player 1 is winning ${score1}-${score2}!`);
    } else if (score1 < score2) {
      console.log(`Player 1 has won, Player 2 is winning ${score2}-${score1}!`);
    } else {
      console.log(`Player 1 has won, the game is tied ${score1}-${score2}!`);
    }
  } else {
    score2++;
    if (score1 > score2) {
      console.log(`Player 2 has won, Player 1 is winning ${score1}-${score2}!`);
    } else if (score1 < score2) {
      console.log(`Player 2 has won, Player 2 is winning ${score2}-${score1}!`);
    } else {
      console.log(`Player 2 has won, the game is tied ${score1}-${score2}!`);
    }
  }
}
if (score1 > score2) {
  console.log(
    `Player 1 has won the game by a final score of ${score1}-${score2}!`
  );
} else {
  console.log(
    `Player 2 has won the game by a final score of ${score2}-${score1}!`
  );
}
