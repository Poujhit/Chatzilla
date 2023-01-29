import React, { useEffect } from 'react';
import ScrollableFeed from 'components/ScrollableContainer/ScrollableContainer';

import { Message } from './ChatScreen';
import useChatScreenStyles from './ChatScreenStyles';
import EachMessage from 'components/messages/EachMessage';

import { animateScroll as scroll } from 'react-scroll';

interface MessagePortionProps {
  messages: Message[];
  name: string;
}

const MessagePortion: React.FC<MessagePortionProps> = (props) => {
  const { classes } = useChatScreenStyles();

  useEffect(() => {
    scroll.scrollToBottom({
      containerId: 'message-portion',
      duration: 200,
      delay: 0,
      ignoreCancelEvents: true,
    });
  }, [props.messages]);
  return (
    <div id='message-portion' className={classes.MessagePortion}>
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
