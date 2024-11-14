
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './TicTacToe.css';


const socket = io('http://localhost:4000');

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.on('gameState', (gameState) => {
      setBoard(gameState.board);
      setCurrentPlayer(gameState.currentPlayer);
      setWinner(gameState.winner);
    });

    return () => {
      socket.off('gameState');
    };
  }, []);

  const handleClick = (index) => {
    if (!board[index] && !winner) {
      socket.emit('makeMove', index);
    }
    else if(board[index] !== ''){
      alert('already clicked');
    }
  };

  const handleReset = () => {
    socket.emit('resetGame');
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {[...Array(9).keys()].map((i) => renderSquare(i))}
      </div>
      {winner ? (
        <h2>Winner: {winner}</h2>
      ) : (
        <h2>Next Player: {currentPlayer}</h2>
      )}
      <button className="button-50" onClick={handleReset}>Reset Game</button>
    </div>
  );
}

export default TicTacToe;
