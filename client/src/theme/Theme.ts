import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'Rubik, sans-serif',
  },

  palette: {
    mode: 'dark',
    primary: {
      main: '#6586e6',
    },
    error: {
      main: '#f65164',
    },
  },
});
