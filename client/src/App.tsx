import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AuthScreen from './views/authView/AuthScreen';
import ChatScreen from './views/chatView/ChatScreen';

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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
