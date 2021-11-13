import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { Button, Card, CircularProgress, Typography } from '@material-ui/core';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

import UserList from './UsersList';
import MessagePortion from './MessagePortion';
import useChatScreenStyles from './ChatScreenStyles';
import MessageInputPortion from './MessageInputPortion';
import roomDataStore from 'stores/RoomDataStore';
import BottomBar from 'components/BottomBar/BottomBar';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export type Message = {
  user: string;
  text: string;
};

export type User = {
  room: string;
  users: [
    {
      id: string;
      name: string;
      room: string;
    }
  ];
};

const ChatScreen: React.FC = () => {
  const classes = useChatScreenStyles();

  const roomData = roomDataStore((state) => state);

  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [users, setUsers] = useState<User>();
  const [isLoading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    socket = io(process.env.REACT_APP_SERVER_URL as string, {
      autoConnect: true,
      reconnection: false,
      reconnectionAttempts: 0,
      transports: ['websocket'],
    });
  }, []);

  useEffect(() => {
    if (roomData.name) {
      socket.emit('join', { name: roomData.name, room: roomData.room });
    }
  }, [roomData.name, roomData.room]);

  useEffect(() => {
    if (roomData.name) {
      socket.on('message', (message: Message) => {
        setMessages((messages) => [...messages, message]);
      });

      socket.on('roomData', (usersInroom: User) => {
        setUsers(usersInroom);
        setLoading(false);
      });
    }
    socket.on('disconnect', () => {
      console.log(socket.connected);
      setMessages((messages) => [
        ...messages,
        {
          user: 'Admin',
          text: 'You have left because of connection issue. Send a message to reconnect.',
        },
      ]);
    });
  }, [roomData.name]);

  const sendMessage = (userTypedMessage: string) => {
    if (!socket.connected) {
      socket.connect();
      socket.emit('join', { name: roomData.name, room: roomData.room });
    }
    socket.emit('sendMessage', userTypedMessage);
  };

  return (
    <div className={classes.Background}>
      {!roomData.name ? (
        <Card
          className={classes.Card}
          style={{
            justifyContent: 'center',
            width: '30%',
            height: '30%',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            style={{
              fontFamily: 'Rubik',
              fontWeight: 'bold',
              fontSize: '20px',
              color: 'darkblue',
            }}
          >
            You are not authenticated. Go to the home page to login.
          </Typography>
          <Button
            className={classes.sendButton}
            onClick={() => history.replace('/')}
          >
            Ok
          </Button>
        </Card>
      ) : (
        <Card
          className={classes.Card}
          onClick={() => {
            setShowEmoji(false);
          }}
        >
          <div className={classes.leftPortionOfCard}>
            <Typography className={classes.title}>
              Users in this chat room:
            </Typography>
            <UserList users={users} />
          </div>
          <div className={classes.chatPortion}>
            <div className={classes.statusBar}>
              <Typography className={classes.statusBarTitle}>
                {`${roomData.room} chat room`}
              </Typography>
              <br />
              <Button
                className={classes.closeButton}
                onClick={() => {
                  socket.disconnect();
                  history.replace('/');
                }}
              >
                X
              </Button>
            </div>
            {isLoading ? (
              <div
                style={{
                  marginTop: '40%',
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <React.Fragment>
                <MessagePortion messages={messages} name={roomData.name} />
                <MessageInputPortion
                  submitChat={sendMessage}
                  setShowEmoji={setShowEmoji}
                  showEmoji={showEmoji}
                />
              </React.Fragment>
            )}
          </div>
        </Card>
      )}
      <BottomBar />
    </div>
  );
};

export default ChatScreen;
