import { makeStyles, createStyles } from '@material-ui/core';
import { CSSProperties } from 'react';

const useChatScreenStyles = makeStyles(() => {
  const cardcontents: CSSProperties = {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return createStyles({
    Background: {
      backgroundColor: '#050934',
      width: '100%',
      height: '100%',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Card: {
      width: '60%',
      height: '80%',
      backgroundColor: '#202442',
      display: 'flex',
      flexDirection: 'row',
    },
    leftPortionOfCard: {
      ...cardcontents,
      postion: 'fixed',
      backgroundColor: '#2b2f4b',
    },
    ScrollingLeftPortion: {
      width: '100%',
    },
    chatPortion: {
      ...cardcontents,
      width: '60%',
    },
    title: {
      fontFamily: 'Rubik, sans-serif',
      color: 'white',
      fontSize: '30px',
      fontWeight: 'bold',
      marginTop: '5%',
    },
    statusBarTitle: {
      fontFamily: 'Rubik, sans-serif',
      color: 'white',
      marginLeft: '1em',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    subTitle: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: '20px',
      marginBottom: '25px',
      color: 'black',
    },
    MessageInputPortion: {
      height: '10%',
      width: '100%',
    },
    statusBar: {
      backgroundColor: '#202442',
      borderBottom: '1px solid #2b2f4b',
      height: '12%',
      boxShadow: '0 2px 2px 0 #25294a, 0 0 0 1px #25294a',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    MessagePortion: {
      height: '88%',
      width: '100%',
    },
    FormPortion: {
      display: 'flex',
      height: '100%',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      borderTop: '2px solid black',
      justifyContent: 'space-between',
    },
    userListItems: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: '25px',
    },
    sendButton: {
      borderRadius: '20px',
      backgroundColor: '#406ae0',
      marginTop: '2%',
      marginLeft: '2%',
      marginBottom: '2%',
      marginRight: '5%',
      '&:hover': {
        borderRadius: '20px',
        border: '2px solid #406ae0',
      },
    },
    emojiButton: {
      borderRadius: '20px',
      border: '2px solid #406ae0',
      marginTop: '2%',
      marginLeft: '5%',
      marginBottom: '2%',
    },
    closeButton: {
      marginRight: '1rem',
      color: 'white',
      fontSize: '1em',
      borderRadius: '18px',
      '&:hover': {
        borderRadius: '20px',
      },
    },
  });
});

export default useChatScreenStyles;
