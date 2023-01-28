import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import AuthScreen from './views/authView/AuthScreen';
import ChatScreen from './views/chatView/ChatScreen';
import { theme } from 'theme/Theme';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthScreen />,
  },
  {
    path: '/chat-room/:roomname',
    element: <ChatScreen />,
  },
  {
    path: '*',
    element: <AuthScreen />,
  },
]);

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
