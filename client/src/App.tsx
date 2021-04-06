import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AuthScreen from './containers/Auth/AuthScreen';
import ChatScreen from './containers/chat/ChatScreen';
import './App.css';
import CreateChatRoomScreen from './containers/chat/CreateChatRoom';

const App: React.FC = (_) => {
	return (
		<BrowserRouter>
			<div className='App'>
				<Switch>
					<Route path='/create-chat-room:id' component={CreateChatRoomScreen} />
					<Route path='/chat-room:roomname' component={ChatScreen} />
					<Route path='/' exact component={AuthScreen} />
					<Redirect to='/' path='/' />
				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default App;
