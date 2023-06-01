// Gameboard module
const Gameboard = (() => {
  let board = [];

  const getBoard = () => board;

  const initializeBoard = () => {
    board = Array(9).fill('');
  };

  const isCellEmpty = (index) => {
    return board[index] === '';
  };

  const updateCell = (index, symbol) => {
    if (isCellEmpty(index)) {
      board[index] = symbol;
      return true; // Indicate successful update
    }
    return false; // Indicate unsuccessful update
  };

  const isBoardFull = () => {
    return board.every((cell) => cell !== '');
  };

  const checkWin = () => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return true; // Game is won
      }
    }

    return false; // Game is not won
  };

  return { getBoard, initializeBoard, isCellEmpty, updateCell, isBoardFull, checkWin };
})();

// Player factory
const Player = (name, symbol) => {
  return { name, symbol };
};

// Game module
const Game = (() => {
  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');
  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const playTurn = (index) => {
    const board = Gameboard.getBoard();
    if (Gameboard.updateCell(index, currentPlayer.symbol)) {
      if (Gameboard.checkWin()) {
        renderBoard();
        displayResult(`Congratulations, ${currentPlayer.name} wins!`);
        disableClicks();
      } else if (Gameboard.isBoardFull()) {
        renderBoard();
        displayResult("It's a tie!");
        disableClicks();
      } else {
        switchPlayer();
        renderBoard();
      }
    }
  };

  const disableClicks = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.removeEventListener('click', cellClickHandler);
    });
  };

  const cellClickHandler = (event) => {
    const index = parseInt(event.target.dataset.index);
    playTurn(index);
  };

  const renderBoard = () => {
    const board = Gameboard.getBoard();
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    for (let i = 0; i < board.length; i++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.textContent = board[i];
      cellElement.dataset.index = i;
      cellElement.addEventListener('click', cellClickHandler);
      gridContainer.appendChild(cellElement);
    }

    boardContainer.appendChild(gridContainer);
  };

  const displayResult = (message) => {
    const resultElement = document.getElementById('result');
    resultElement.textContent = message;
  };

  const startGame = () => {
    const player1Name = document.getElementById('player1-name').value;
    const player2Name = document.getElementById('player2-name').value;

    player1.name = player1Name !== '' ? player1Name : 'Player 1';
    player2.name = player2Name !== '' ? player2Name : 'Player 2';

    Gameboard.initializeBoard();
    renderBoard();
  };

  const initializeGame = () => {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);

    // Add this code to initialize the game immediately
    Gameboard.initializeBoard();
    renderBoard();
  };

  return { initializeGame };
})();

// Start the game
Game.initializeGame();