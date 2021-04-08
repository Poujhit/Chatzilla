import React from 'react';
import { Message } from '../../containers/chat/ChatScreen/ChatScreen';
import eachMessageStyles from './EachMessageStyles';

interface EachMessageProps {
	message: Message;
	username: string;
}

const EachMessage: React.FC<EachMessageProps> = (props) => {
	const classes = eachMessageStyles();
	let isSentByCurrentUser = false;
	const trimmedName = props.username.trim().toLowerCase();

	if (props.message.user === trimmedName) {
		isSentByCurrentUser = true;
	}

	return isSentByCurrentUser ? (
		<div
			className={classes.myMessageContainer}
			style={{
				justifyContent: 'flex-end',
			}}
		>
			<p className={classes.userNameText}>{props.message.user}</p>
			<div className={classes.myMessageTextBox}>
				<p className={classes.messageText}>{props.message.text}</p>
			</div>
		</div>
	) : props.message.user === 'Admin' ? (
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
				<p className={classes.messageText}>{props.message.text}</p>
			</div>
		</div>
	) : (
		<div
			className={classes.myMessageContainer}
			style={{
				justifyContent: 'flex-start',
			}}
		>
			<div className={classes.otherMessageTextBox}>
				<p className={classes.messageText}>{props.message.text}</p>
			</div>
			<p className={classes.userNameText}>{props.message.user}</p>
		</div>
	);
};

export default EachMessage;
