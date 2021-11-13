import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AuthScreen from 'containers/Auth/AuthScreen';
import ChatScreen from 'containers/Chat/ChatScreen';

import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route path='/chat-room/:roomname' component={ChatScreen} />
          <Route path='/' exact component={AuthScreen} />
          <Redirect to='/' path='/' />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
