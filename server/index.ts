import http from 'http';
import express from 'express';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './router';
import { addUser, removeUser, getUser, getUsersInRoom } from './users';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  allowUpgrades: false,
  pingTimeout: 30000,
  cors: {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST'],
  },
});

const corsOptions = {
  origin: process.env.ORIGIN,
};

app.use(cors(corsOptions));
app.use(router);

io.on('connect', (socket: Socket) => {
  console.log('connected');
  socket.on('join', ({ name, room }) => {
    console.log(name, room);
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
    console.log('here');
    if (user) {
      console.log(user);
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

server.listen(8080, () => console.log(`Server has started.`));
