**Features**
Real-time 2 player gameplay using socket.io
simple React-based frontend for the TicTacToe game
Node.js backend with Socket.io for synchronizing game states
Supports multiple games with unique game IDs

**Getting Started**

**Prerequisites**
Before running this application, make sure you have the following installed:
Node.js (v14 or higher)
npm (comes with node.js)

**Installation**
1. Clone the repository:
  git clone https://github.com/your-username/tictactoe-multiplayer.git
cd tictactoe-multiplayer
2. Install server dependencies: 
  cd server
  npm install
3. Install client dependencies:
  cd ../src
  npm install

**Running the application**
1. Start the server
   Navigate to the server folder and run the Node.js server:
  cd server
  node server.js
2. Start the client:
  Navigate to the client folder and start the React app:
  cd ../client
  npm start
The React app will open in your default browser on http://localhost:3000

**How It Works**
When a player visits the site, they join a default game session (game1).
The game state (whose turn it is and the current board) is synchronized across all clients in that game session.
Players take turns by clicking on cells, and their moves are instantly reflected on all connected clients.

**Example Gameplay**
The game starts with Player 1 as 'X' and Player 2 as 'O'.
Players take turns by clicking on the board's cells.
The first player to align three marks (horizontally, vertically, or diagonally) wins.
If all cells are filled without a winner, the game declares a draw.

**Folder Structure**

│── src                    # React frontend
│    ├── TicTacToe.js       # Main game logic
│    └── TicTacToe.css
└── server               # Node.js backend with Socket.IO
    └── server.js

**Technologies Used**
Frontend: React
Backend: Node.js, Express, Socket.IO
Real-time Communication: Socket.IO

**Customization**
Feel free to modify the server-side logic in server.js to add more features like player tracking, game history or scoring.
Add functionality for multiple players using room-based game sessions

