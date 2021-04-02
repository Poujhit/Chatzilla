const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');

const app = express();
const server = http.createServer(app);

const io = socketio(server);

const PORT = 5000 || process.env.PORT;

app.use(router);

io.on('connection', (socket) => {
	console.log('connection is done');

	socket.on('disconnet', () => {
		console.log('user left');
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
