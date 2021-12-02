import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider, withStyles } from '@material-ui/core';

import AuthScreen from 'containers/Auth/AuthScreen';
import ChatScreen from 'containers/Chat/ChatScreen';

import { theme } from 'theme/Theme';
import { scrollBarStyle } from 'theme/ScrollbarStyles';

import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route path='/chat-room/:roomname' component={ChatScreen} />
            <Route path='/' exact component={AuthScreen} />
            <Redirect to='/' path='/' />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default withStyles(scrollBarStyle)(App);
