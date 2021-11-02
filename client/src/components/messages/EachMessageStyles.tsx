import { makeStyles, createStyles } from '@material-ui/core';

const eachMessageStyles = makeStyles(() =>
  createStyles({
    myMessageContainer: {
      display: 'flex',
      padding: '0.5%',
      marginTop: '10px',
      marginLeft: '10px',
    },
    myMessageTextBox: {
      backgroundColor: '#032470',

      borderRadius: '20px',
      padding: '5px 20px',
      color: 'white',
      maxWidth: '70%',
    },
    otherMessageTextBox: {
      backgroundColor: '#0656D9',
      borderRadius: '20px',
      padding: '5px 20px',
      color: 'white',
      display: 'inline-block',
      maxWidth: '80%',
    },
    userNameText: {
      paddingLeft: '5px',
      fontFamily: 'Rubik, sans-serif',
      paddingRight: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    messageText: {
      width: '100%',
      fontFamily: 'Rubik, sans-serif',

      letterSpacing: '0',
      float: 'left',
      fontSize: '0.9em',
      wordWrap: 'break-word',
    },
  })
);

export default eachMessageStyles;
