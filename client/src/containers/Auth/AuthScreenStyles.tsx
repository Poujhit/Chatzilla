import { makeStyles, createStyles } from '@material-ui/core';
import { CSSProperties } from 'react';

const useStyles = makeStyles(() => {
  const cardcontents: CSSProperties = {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  return createStyles({
    Background: {
      backgroundColor: '#439CEF',
      width: '100%',
      height: '100%',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Image: {
      height: '100px',
      width: '95px',
      marginTop: '70px',
    },
    Card: {
      width: '60%',
      height: '70%',
      display: 'flex',
      borderRadius: '16px',
      flexDirection: 'row',
    },
    leftPortionCard: {
      ...cardcontents,
      backgroundColor: '#1D63DC',
    },
    rightPortionCard: {
      ...cardcontents,
    },
    title: {
      fontFamily: 'Rubik, sans-serif',
      color: 'white',
      fontSize: '50px',
      fontWeight: 'bold',
      marginTop: '4%',
    },
    subTitle: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: '25px',
      color: 'white',
      padding: '15px',
      fontWeight: 'bold',
    },
    subTitle1: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: '20px',
      color: 'white',
      padding: '15px',
    },
    TextFieldStyle: {
      margin: '20px 20px',
      backgroundColor: '#F6F3F3',
    },
    LoginorSignupButton: {
      borderRadius: '20px',
      backgroundColor: '#1D63DC',
      color: 'white',
      width: '40%',
      marginTop: '15px',
      height: '50px',
      alignSelf: 'center',
      transition: 'all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      '&:hover': {
        backgroundColor: '#1D63DC',
        borderRadius: '10px',
        border: '2px solid #1D63DC',
      },
    },
  });
});

export default useStyles;
