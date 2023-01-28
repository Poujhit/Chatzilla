import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  typography: {
    fontFamily: 'Rubik, sans-serif',
  },

  palette: {
    type: 'dark',
    primary: {
      main: '#6586e6',
    },
    error: {
      main: '#f65164',
    },
  },
});
