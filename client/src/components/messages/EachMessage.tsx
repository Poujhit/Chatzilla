import React from 'react';

import eachMessageStyles from './EachMessageStyles';
import { Message } from 'containers/Chat/ChatScreen';
import Linkify from 'react-linkify';

interface EachMessageProps {
  message: Message;
  username: string;
}

const LinkifyWrapper: React.FC = ({ children }) => (
  <Linkify
    componentDecorator={(decoratedHref, decoratedText, key) => (
      <a
        target='_blank'
        style={{ color: 'white' }}
        href={decoratedHref}
        key={key}
        rel='noreferrer'
      >
        {decoratedText}
      </a>
    )}
  >
    {children}
  </Linkify>
);

const EachMessage: React.FC<EachMessageProps> = (props) => {
  const classes = eachMessageStyles();
  let isSentByCurrentUser = false;
  const trimmedName = props.username.trim().toLowerCase();

  if (props.message.user === trimmedName) {
    isSentByCurrentUser = true;
  }

  if (isSentByCurrentUser) {
    return (
      <div
        className={classes.myMessageContainer}
        style={{
          justifyContent: 'flex-end',
          marginRight: '10px',
        }}
      >
        <p className={classes.userNameText}>{props.message.user}</p>
        <div className={classes.myMessageTextBox}>
          <p className={classes.messageText}>
            <LinkifyWrapper>{props.message.text}</LinkifyWrapper>
          </p>
        </div>
      </div>
    );
  } else {
    if (props.message.user === 'Admin') {
      return (
        <div
          className={classes.myMessageContainer}
          style={{
            justifyContent: 'center',
          }}
        >
          <div
            className={classes.otherMessageTextBox}
            style={{
              backgroundColor: '#2263A5',
            }}
          >
            <p className={classes.messageText}>
              <LinkifyWrapper>{props.message.text}</LinkifyWrapper>
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={classes.myMessageContainer}
          style={{
            justifyContent: 'flex-start',
            marginLeft: '10px',
          }}
        >
          <div className={classes.otherMessageTextBox}>
            <p className={classes.messageText}>{props.message.text}</p>
          </div>
          <p className={classes.userNameText}>{props.message.user}</p>
        </div>
      );
    }
  }
};

export default EachMessage;
