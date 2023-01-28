import React from 'react';
import ScrollableFeed from 'components/ScrollableContainer/ScrollableContainer';

import { Message } from './ChatScreen';
import useChatScreenStyles from './ChatScreenStyles';
import EachMessage from 'components/messages/EachMessage';

interface MessagePortionProps {
  messages: Message[];
  name: string;
}

const MessagePortion: React.FC<MessagePortionProps> = (props) => {
  const { classes } = useChatScreenStyles();
  return (
    <div className={classes.MessagePortion}>
      {props.messages.map((eachmessage, index) => {
        return (
          <EachMessage
            key={index}
            message={eachmessage}
            username={props.name}
          />
        );
      })}
    </div>
  );
};

export default MessagePortion;
