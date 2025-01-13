import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './TicTacToe.css';


const socket = io('http://localhost:4000');

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    socket.on('gameState', (gameState) => {
      setBoard(gameState.board);
      setCurrentPlayer(gameState.currentPlayer);
      setWinner(gameState.winner);
      setError('');
    });
  
    socket.on('playerSymbol', (symbol) => {
      setPlayerSymbol(symbol); // Set the player symbol
    });
  
    socket.on('error', (message) => {
      setError(message);
    });
  
    return () => {
      socket.off('gameState');
      socket.off('playerSymbol');
      socket.off('error');
    };
  }, []);

  const handleClick = (index) => {
    socket.emit('makeMove', index);
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
      <p>You are: {playerSymbol}</p>
      {error && <p className="error">{error}</p>}
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
