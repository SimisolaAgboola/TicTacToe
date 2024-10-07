const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let games = {};

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('joinGame', (gameId) => {
        socket.join(gameId);
        if (!games[gameId]) {
            games[gameId] = {
                cells: Array(9).fill(''),
                turn: 'x',
            };
        }
        io.to(gameId).emit('updateGame', games[gameId]);
    });

    socket.on('makeMove', ({ gameId, index }) => {
        const game = games[gameId];
        if (game && game.cells[index] === '') {
            game.cells[index] = game.turn;
            game.turn = game.turn === 'x' ? 'o' : 'x';
            io.to(gameId).emit('updateGame', game);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});
