const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app); //variable of our express server that will be conneceted to our server io
const io = new Server(server, {
	cors: {
		// determining cors the will be accepted to avoid cors issues
		origin: 'http://localhost:3002', //telling our socket io server which server (react url) will call it
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	// telling socket io that we're listening event with this id (connection)
	console.log(`User connected: ${socket.id}`);

	socket.on('join_room', (data) => {
		socket.join(data);
		console.log(`User ID: ${socket.id} joined room: ${data}`);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected', socket.id);
	});
});

server.listen(3001, () => {
	console.log('Server up and running at port 3001');
});
