let cols;
let rows;
let board;
let scale = 10;

/*  Reloads the page to reset the board and inputs. 
    I tried to reset the board, but the best
    I could do without reloading the page was to leave everything blank hahaha. 
    I found it more useful and easier this way.
*/
// Comment the below function to run the tests in Jest
document.getElementById("clearButton").addEventListener("click", function () {
  window.location.reload();
});

// Basically, to avoid reloading the page, it fetches the values ​​from the inputs and ensures that they do not exceed 121 columns and 70 rows.
// Comment the below function to run the tests in Jest
function handleSubmit(event) {
  event.preventDefault();

  cols = parseInt(document.getElementById("cols").value); // ParseInt to ensure that the values ​​are integers.
  rows = parseInt(document.getElementById("rows").value);
  const colsMax = 121;
  const rowsMax = 70;

  if (cols > colsMax) {
    cols = colsMax;
  }

  if (rows > rowsMax) {
    rows = rowsMax;
  }

  main();
}

// Function to create the matrix.
// Uncomment the export below to run the tests in Jest.
/*export*/ function CreateArray(cols, rows) {
  let array = [];
  for (let i = 0; i < cols; i++) {
    array.push(new Array(rows).fill(null)); // It was giving an error because the array was empty before receiving numbers, I don't know why.
  }
  return array;
}

// Function to create the canvas screen, it multiplies the user's value by 10 so they don't have to input such a large number.
function setupCanvas() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = cols * scale;
  canvas.height = rows * scale;
}

// Function that paints the board in black and white.
function drawBoard() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * scale;
      let y = j * scale;
      ctx.fillStyle = board[i][j] === 1 ? "white" : "black";
      ctx.fillRect(x, y, scale, scale);
      ctx.strokeRect(x, y, scale, scale);
    }
  }
}

// Function to update the board, generating new generations and redrawing the board, providing the characteristic animation of the game.
function updateBoard() {
  let nextGen = CreateArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let setBoard = board[i][j];
      let count = NeighborsCounter(board, i, j);
      if (setBoard == 0 && count == 3) {
        nextGen[i][j] = 1;
      } else if (setBoard == 1 && (count < 2 || count > 3)) {
        nextGen[i][j] = 0;
      } else {
        nextGen[i][j] = setBoard;
      }
    }
  }
  board = nextGen; // Updates to the next generation.
  drawBoard(); // Draws the new board.
}

// Function to count neighbors and enable the logic for cell death and cell birth.
// Uncomment the export below to run the tests in Jest.
/*export*/ function NeighborsCounter(board, x, y) {
  const cols = board.length;
  const rows = board[0].length;
  let count = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      count += board[col][row];
    }
  }
  count -= board[x][y];
  return count;
}

// Randomize the board between 0-dead and 1-alive.
// Uncomment the export below to run the tests in Jest.
/*export*/ function RandomizeBoard(cols, rows, board){
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = Math.floor(Math.random() * 2);
    }
  }
}

// Main function to call the functions and make the game happen.
function main() {
  setupCanvas();
  board = CreateArray(cols, rows);
  RandomizeBoard(cols, rows, board)
  drawBoard(); // Draws the initial board.
  setInterval(updateBoard, 100); // Updates the board every 0.2 seconds.
}
