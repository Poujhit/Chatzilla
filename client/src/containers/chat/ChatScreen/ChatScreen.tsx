import React, { useEffect } from 'react';

import io, { Socket } from 'socket.io-client';
import { Card, Typography } from '@material-ui/core';
import useChatScreenStyles from './ChatScreenStyles';
import roomDataStore from '../../../stores/RoomDataStore';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import ScrollingComponent from '../../../components/ScrolltoBottom.jsx';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
type Message = {
	user: string;
	text: string;
};

type Users = {
	room: string;
	users: string[];
};

const ChatScreen: React.FC = (props) => {
	const classes = useChatScreenStyles();
	const roomData = roomDataStore((state) => state);
	// const [users, setUsers] = useState('');
	// const [message, setMessage] = useState('');
	// const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		// const { name, room } = queryString.parse(location.search);
		const connectionOptions: any = {
			'force new connection': true,
			reconnectionAttempts: 'Infinity',
			timeout: 10000,
			transports: ['websocket'],
		};

		socket = io('http://localhost:5000/', connectionOptions);
		console.log('here in chat room ' + roomData.name + ' ' + roomData.room);

		socket.emit('join', { name: roomData.name, room: roomData.room });
	}, [roomData]);

	useEffect(() => {
		socket.on('message', (message: Message) => {
			//   setMessages(messages => [ ...messages, message ]);
			console.log('message:' + message.text + ' ' + message.user);
		});

		socket.on('roomData', (usersInroom: Users) => {
			// setUsers(users);
			console.log(usersInroom.users);
		});
	}, []);

	// const sendMessage = () => {
	// 	socket.emit('sendMessage', 'hello from me');
	// };

	return (
		<div className={classes.Background}>
			<Card className={classes.Card}>
				<div className={classes.leftPortionOfCard}>
					<Typography className={classes.title}>
						Users in this chat room:
					</Typography>
					<ScrollingComponent>
						<p>
							Nostrud nisi duis veniam ex esse laboris consectetur officia et.
							Velit cillum est veniam culpa magna sit exercitation excepteur
							consectetur ea proident. Minim pariatur nisi dolore Lorem ipsum
							adipisicing do. Ea cupidatat Lorem sunt fugiat. Irure est sunt
							nostrud commodo sint.
						</p>
						<p>
							Duis consectetur ad in fugiat et aliquip esse adipisicing occaecat
							et sunt ea occaecat ad. Tempor anim consequat commodo veniam
							nostrud sunt deserunt adipisicing Lorem Lorem magna irure. Eu ut
							ipsum magna nulla sunt duis Lorem officia pariatur. Nostrud nisi
							anim nostrud ea est do nostrud cupidatat occaecat dolor labore do
							anim. Laborum quis veniam ipsum ullamco voluptate sit ea qui
							adipisicing aliqua sunt dolor nulla. Nulla consequat sunt qui
							amet. Pariatur esse pariatur veniam non fugiat laboris eu nulla
							incididunt.
						</p>
						<p>
							Duis consectetur ad in fugiat et aliquip esse adipisicing occaecat
							et sunt ea occaecat ad. Tempor anim consequat commodo veniam
							nostrud sunt deserunt adipisicing Lorem Lorem magna irure. Eu ut
							ipsum magna nulla sunt duis Lorem officia pariatur. Nostrud nisi
							anim nostrud ea est do nostrud cupidatat occaecat dolor labore do
							anim. Laborum quis veniam ipsum ullamco voluptate sit ea qui
							adipisicing aliqua sunt dolor nulla. Nulla consequat sunt qui
							amet. Pariatur esse pariatur veniam non fugiat laboris eu nulla
							incididunt.
						</p>
						<p>
							Laboris duis do consectetur aliquip non aliquip ad ad quis minim.
							Aute magna tempor occaecat magna fugiat culpa. Commodo id eiusmod
							ea pariatur consequat fugiat minim est anim. Ipsum amet ipsum eu
							nisi. Exercitation minim amet incididunt tempor do ut id in
							officia eu sit est. Dolor qui laboris laboris tempor sunt velit
							eiusmod non ipsum exercitation ut sint ipsum officia.
						</p>
					</ScrollingComponent>
				</div>
				<div className={classes.chatPortion}>
					<div className={classes.statusBar}></div>
				</div>
			</Card>
		</div>
	);
};

export default ChatScreen;
