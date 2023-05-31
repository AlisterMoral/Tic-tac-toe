// Gameboard module
const Gameboard = (() => {
    let board = [];
  
    const getBoard = () => board;
  
    const initializeBoard = () => {
      board = Array(9).fill('');
    };
  
    const updateCell = (index, symbol) => {
      board[index] = symbol;
    };
  
    return { getBoard, initializeBoard, updateCell };
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
      if (board[index] === '') {
        Gameboard.updateCell(index, currentPlayer.symbol);
        switchPlayer();
        renderBoard();
      }
    };
  
    const renderBoard = () => {
      const board = Gameboard.getBoard();
      const boardContainer = document.getElementById('board');
      boardContainer.innerHTML = '';
  
      board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => playTurn(index));
        boardContainer.appendChild(cellElement);
      });
    };
  
    const start = () => {
      Gameboard.initializeBoard();
      renderBoard();
    };
  
    return { start };
  })();
  
  Game.start();