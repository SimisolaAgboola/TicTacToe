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

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send initial game state to newly connected player
  socket.emit('gameState', gameState);

  // Handle move from a player
  socket.on('makeMove', (index) => {
    if (gameState.board[index] === null && !gameState.winner) {
      gameState.board[index] = gameState.currentPlayer;
      gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
      gameState.winner = checkWinner(gameState.board);
      
      io.emit('gameState', gameState);
    }
  });

  // Reset game
  socket.on('resetGame', () => {
    gameState = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    };
    io.emit('gameState', gameState);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
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
