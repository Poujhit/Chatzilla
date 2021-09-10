const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  allowUpgrades: false,
  pingTimeout: 30000,
});

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  console.log('connected');
  socket.on('join', ({ name, room }) => {
    const user = addUser({ id: socket.id, name, room });

    socket.join(user.room);

    socket.emit('message', {
      user: 'Admin',
      text: `${user.name}, Welcome to the Chat Room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'Admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on('sendMessage', (message) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
  });

  socket.on('disconnect', (reason) => {
    console.log(reason);
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
