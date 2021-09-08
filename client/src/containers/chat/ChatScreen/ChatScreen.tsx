import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { Button, Card, CircularProgress, Typography } from '@material-ui/core';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

import UserList from './UsersList';
import MessagePortion from './MessagePortion';
import useChatScreenStyles from './ChatScreenStyles';
import MessageInputPortion from './MessageInputPortion';
import userDataStore from '../../../stores/UserDataStore';
import roomDataStore from '../../../stores/RoomDataStore';

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

  const isAuthenticated = userDataStore((state) => state.isAuthenticated);

  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User>();
  const [isLoading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      // const connectionOptions: any = {
      //   'force new connection': true,
      //   reconnectionAttempts: 'Infinity',
      //   timeout: 10000,
      //   transports: ['websocket'],
      // };

      socket = io(process.env.REACT_APP_SERVER_URL as string, {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        timeout: 10000000000,
        transports: ['websocket'],
      });

      socket.emit('join', { name: roomData.name, room: roomData.room });
    }
  }, [isAuthenticated, roomData]);

  useEffect(() => {
    if (isAuthenticated) {
      socket.on('message', (message: Message) => {
        setMessages((messages) => [...messages, message]);
      });

      socket.on('roomData', (usersInroom: User) => {
        setUsers(usersInroom);
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  const sendMessage = (userTypedMessage: string) => {
    socket.emit('sendMessage', userTypedMessage);
  };
  console.log(isLoading);

  return (
    <div className={classes.Background}>
      {!isAuthenticated ? (
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
        <Card className={classes.Card}>
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
                <MessageInputPortion submitChat={sendMessage} />
              </React.Fragment>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChatScreen;
