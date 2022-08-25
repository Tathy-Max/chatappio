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
		origin: 'http://localhost:3000', //telling our socket io server which server (react url) will call it
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	// telling socket io that we're listening event with this id (connection)
	console.log(socket.id);

	socket.on('disconnect', () => {
		console.log('User disconnected', socket.id);
	});
});

server.listen(3001, () => {
	console.log('Server up and running at port 3001');
});
