const io = require('socket.io')(4000, {
  cors: {
      origin: ["http://localhost:3000", "https://SimisolaAgboola.github.io"],
      methods: ["GET", "POST"],
  }
});

let gameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
};

const players = {}; // Maps socket IDs to 'X' or 'O'

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  const playerCount = Object.keys(players).length;
  if (playerCount === 0) {
    players[socket.id] = 'X';
  } else if (playerCount === 1) {
    players[socket.id] = 'O';
  } else {
    socket.emit('error', 'Game is full!');
    socket.disconnect();
    return;
  }

  const playerSymbol = players[socket.id];
  console.log(`Player ${playerSymbol} connected: ${socket.id}`);

  socket.emit('playerSymbol', playerSymbol); // Send player's symbol to the client
  socket.emit('gameState', gameState); // Send initial game state to the client

  socket.on('makeMove', (index) => {
    if (
      gameState.board[index] === null &&
      !gameState.winner &&
      gameState.currentPlayer === playerSymbol
    ) {
      gameState.board[index] = playerSymbol;
      gameState.currentPlayer = playerSymbol === 'X' ? 'O' : 'X';
      gameState.winner = checkWinner(gameState.board);

      io.emit('gameState', gameState); // Broadcast updated game state
    } else if (gameState.currentPlayer !== playerSymbol) {
      socket.emit('error', 'It’s not your turn!');
    }
  });

  socket.on('resetGame', () => {
    gameState = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    };
    io.emit('gameState', gameState);
  });

  socket.on('disconnect', () => {
    console.log(`Player ${players[socket.id]} disconnected: ${socket.id}`);
    delete players[socket.id];
  });
});

function checkWinner(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  // No winner or draw
  return null;
}
