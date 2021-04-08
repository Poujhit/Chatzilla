import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import EachMessage from '../../../components/messages/EachMessage';
import { Message } from './ChatScreen';
import useChatScreenStyles from './ChatScreenStyles';

interface MessagePortionProps {
	messages: Message[];
	name: string;
}

const MessagePortion: React.FC<MessagePortionProps> = (props) => {
	const classes = useChatScreenStyles();
	return (
		<ScrollableFeed forceScroll={true} className={classes.MessagePortion}>
			{
				props.messages.map((eachmessage, index) => {
					return (
						<EachMessage
							key={index}
							message={eachmessage}
							username={props.name}
						/>
					);
				}) as JSX.Element[]
			}
		</ScrollableFeed>
	);
};

export default MessagePortion;
