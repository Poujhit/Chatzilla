import React from 'react';

import eachMessageStyles from './EachMessageStyles';
import { Message } from '../../containers/chat/ChatScreen/ChatScreen';

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

	if (isSentByCurrentUser) {
		return (
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
						<p className={classes.messageText}>{props.message.text}</p>
					</div>
				</div>
			);
		} else {
			return (
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
		}
	}
};

export default EachMessage;
