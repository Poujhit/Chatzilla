import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';

import { GlobalStyles } from '@mui/material';

import { QueryClientProvider, QueryClient } from 'react-query';

import './index.css';
import { scrollBarStyle } from 'theme/ScrollbarStyles';

const clientQuery = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={clientQuery}>
    <CssBaseline />
    <GlobalStyles styles={scrollBarStyle} />
    <App />
  </QueryClientProvider>
);
