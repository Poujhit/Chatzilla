import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { QueryClientProvider, QueryClient } from 'react-query';

import './index.css';

const clientQuery = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={clientQuery}>
    <App />
  </QueryClientProvider>
);
