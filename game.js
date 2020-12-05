let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext('2d');
let gameOver = false;
let isWinner = false;//condition to fix bug when winning on a board filling marker placement

context.font = "40pt Courier New"
context.fillStyle = "blue";

const model = {
  squares : [[' ',' ',' ',' ',' ',' ',' '],[' ',' ',' ',' ',' ',' ',' '],[' ',' ',' ',' ',' ',' ',' '],[' ',' ',' ',' ',' ',' ',' '],[' ',' ',' ',' ',' ',' ',' '],[' ',' ',' ',' ',' ',' ',' ']],
  rowTracker : [5,5,5,5,5,5,5],
  next: 'X'  
}

function otherPlayer(player) {
  switch (player) {
  case 'X':
    return 'O';
  case 'O':
    return 'X';
  default:
    console.log("Not valid player");
  }
}

function render() {
  if (gameOver == false)
  {
    if (model.next == 'X')
      document.querySelector("#currentPlayer").innerText = "Player 1, press a number to place an X.";
    else
      document.querySelector("#currentPlayer").innerText = "Player 2, press a number to place an O.";
  }
  else
  {
    if ((model.rowTracker[0] < 0) && (model.rowTracker[1] < 0) && (model.rowTracker[2] < 0) && (model.rowTracker[3] < 0) && (model.rowTracker[4] < 0) && (model.rowTracker[5] < 0) && (model.rowTracker[6] < 0) && (isWinner == false))
    {
      document.querySelector("#currentPlayer").innerText = "The board is full, but neither player connected four. Tie game!";
    }
    else if (model.next == 'X')
      document.querySelector("#currentPlayer").innerText = "Player 2 has won the game! Congratulations!";
    else
      document.querySelector("#currentPlayer").innerText = "Player 1 has won the game! Congratulations!";
  }

  for(let i = 0;i<6;i++) {
    context.fillText(model.squares[i].join('|'),100,100 + i * 40);
    if (i < 5)
      context.fillText("-------------",100,120 + i * 40);
    else
      context.fillText("1 2 3 4 5 6 7",100,150 + i * 40);
  }
}

//Victory condition checking. I suspect there's a much cleaner way to do this but I am too smooth brained to conceptualize it
function checkVictory(row, column) {
  let currentMarker = model.next;
  //let otherMarker = otherPlayer(model.next);
  if (row <= 2)//check for vertical victory
  {
    if (model.squares[row+1][column] == currentMarker)
    {
      if (model.squares[row+2][column] == currentMarker)
      {
        if (model.squares[row+3][column] == currentMarker)
        {
          gameOver = true;
          isWinner = true;
          return;
        }
      }
    }
  }
  if (column-1 >= 0)//check for horizontal victory
  {
    if (model.squares[row][column-1] == currentMarker)
    {
      if (column-2 >= 0)
      {
        if (model.squares[row][column-2] == currentMarker)
        {
          if (column-3 >= 0)
          {
            if(model.squares[row][column-3] == currentMarker)
            {
              gameOver = true;
              isWinner = true;
              return;
            }
          }
          if (column+1 <= 6)
          {
            if (model.squares[row][column+1] == currentMarker)
            {
              gameOver = true;
              isWinner = true;
              return;
            }
          }
        }
      }
      if (column+1 <= 6)
      {
        if (model.squares[row][column+1] == currentMarker)
        {
          if (column+2 <= 6)
          {
            if (model.squares[row][column+2] == currentMarker)
            {
              gameOver = true;
              isWinner = true;
              return;
            }
          }
        }
      }
    }
  }
  if (column+3 <= 6)//part of horizontal checking
  {
    if ((model.squares[row][column+1] == currentMarker) && (model.squares[row][column+2] == currentMarker) && (model.squares[row][column+3] == currentMarker))
    {
      gameOver = true;
      isWinner = true;
      return;
    }
  }
  if ((row-1 >= 0) && (column-1 >= 0))//check for upper-left to lower-right diagonal victory
  {
    if (model.squares[row-1][column-1] == currentMarker)
    {
      if ((row-2 >= 0) && (column-2 >= 0))
      {
        if (model.squares[row-2][column-2] == currentMarker)
        {
          if ((row-3 >= 0) && (column-3 >= 0))
          {
            if (model.squares[row-3][column-3] == currentMarker)
            {
              gameOver = true;
              isWinner = true;
              return;
            }
          }
          if ((row+1 <= 5) && (column+1 <= 6))
          {
            if (model.squares[row+1][column+1] == currentMarker)
            {
              gameOver = true;
              isWinner = true;
              return;
            }
          }
        }
      }
      if ((row+1 <= 5) && (column+1 <=6))
      {
        if (model.squares[row+1][column+1] == currentMarker)
        {
          if ((row+2 <= 5) && (column+2 <= 6))
          {
            if (model.squares[row+2][column+2] == currentMarker)
            {
              gameOver = true;
              isWinner = true;
              return;
            }
          }
        }
      }
    }
  }
  if ((row+3 <= 5) && (column+3 <=6))
  {
    if ((model.squares[row+1][column+1] == currentMarker) && (model.squares[row+2][column+2] == currentMarker) && (model.squares[row+3][column+3] == currentMarker))
    {
      gameOver = true;
      isWinner = true;
      return;
    }
  }
  if ((row+1 <= 5) && (column-1 >= 0))//check for lower-left to upper-right diagonal victory
  {
    if (model.squares[row+1][column-1] == currentMarker)
    {
      if ((row+2 <= 5) && (column-2 >= 0))
      {
        if (model.squares[row+2][column-2] == currentMarker)
        {
          if ((row+3 <= 5) && (column-3 >= 0))
          {
            if (model.squares[row+3][column-3] == currentMarker)
            {
              gameOver = true;
              isWinner = true;
              return;
            }
          }
          if ((row-1 >= 0) && (column+1 <= 6))
          {
            if (model.squares[row-1][column+1] == currentMarker)
            {
              gameOver = true;
              isWinner = true;
              return;
            }
          }
        }
      }
      if ((row-1 >= 0) && (column+1 <= 6))
      {
        if (model.squares[row-1][column+1] == currentMarker)
        {
          if ((row-2 >= 0) && (column+2) <= 6)
          {
            if (model.squares[row-2][column+2] == currentMarker)
            {
              gameOver = true;
              isWinner = true;
              return;
            }
          }
        }
      }
    }
  }
  if ((row-3 >= 0) && (column+3 <= 6))
  {
    if ((model.squares[row-1][column+1] == currentMarker) && (model.squares[row-2][column+2] == currentMarker) && (model.squares[row-3][column+3] == currentMarker))
    {
      gameOver = true;
      isWinner = true;
      return;
    }
  }
}

document.querySelector("body").addEventListener(
  "keydown",
  e => {
    let id = parseInt(e.key) - 1;
    if (typeof(id) != "number") {
      return;
    }
    console.log("got",id);
    let col = id;
    let row = model.rowTracker[id];
    if (gameOver == false)
    {
      model.squares[row][col] = model.next;
      checkVictory(row, col);
      model.rowTracker[id] = model.rowTracker[id] - 1;
      if ((model.rowTracker[0] < 0) && (model.rowTracker[1] < 0) && (model.rowTracker[2] < 0) && (model.rowTracker[3] < 0) && (model.rowTracker[4] < 0) && (model.rowTracker[5] < 0) && (model.rowTracker[6] < 0))//checks for full board, thus tie game.. unless victory on completing full board
      {
        gameOver = true;
      }
      model.next = otherPlayer(model.next);
    }
    else
    { 
      return;
    }
  }
);

document.querySelector("#button").addEventListener(
  "click",
  e => {
    model.squares = [[' ',' ',' ',' ',' ',' ',' '],[' ',' ',' ',' ',' ',' ',' '],[' ',' ',' ',' ',' ',' ',' '],[' ',' ',' ',' ',' ',' ',' '],[' ',' ',' ',' ',' ',' ',' '],[' ',' ',' ',' ',' ',' ',' ']];
    model.rowTracker = [5,5,5,5,5,5,5];
    model.next = 'X';
    gameOver = false;
    isWinner = false;
  }
);



function splat(t) {
  context.clearRect(0,0,canvas.width,canvas.height)
  render();
  window.requestAnimationFrame(splat);
}
window.requestAnimationFrame(splat);