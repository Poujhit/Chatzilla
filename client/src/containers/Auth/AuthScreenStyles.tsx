import { makeStyles, createStyles } from '@material-ui/core';
import { CSSProperties } from 'react';

/*
How breakpoints work

value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
*/

const useStyles = makeStyles(({ breakpoints }) => {
  const cardcontents: CSSProperties = {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  return createStyles({
    Background: {
      backgroundColor: '#202442',
      width: '100%',
      height: '100%',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Image: {
      height: '85px',
      width: '85px',
      marginTop: '70px',
    },
    Card: {
      width: '60%',
      height: '70%',
      display: 'flex',
      borderRadius: '16px',
      flexDirection: 'row',
      [breakpoints.down('sm')]: {
        flexDirection: 'column',
        height: '80%',
        width: '70%',
      },
      [breakpoints.down('xs')]: {
        height: '80%',
        width: '80%',
      },
    },
    leftPortionCard: {
      ...cardcontents,
      backgroundColor: '#263C7E',
      [breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    rightPortionCard: {
      ...cardcontents,
      backgroundColor: '#25294a',
      [breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    title: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: '50px',
      fontWeight: 'bold',
      marginTop: '4%',

      [breakpoints.down(295)]: {
        fontSize: '30px',
      },
    },
    subTitle: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: '25px',
      padding: '15px',
      fontWeight: 'bold',
      [breakpoints.down(295)]: {
        fontSize: '20px',
      },
    },
    subTitle1: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: '20px',
      padding: '15px',
    },
    TextFieldStyle: {
      margin: '20px 20px',
    },
    LoginorSignupButton: {
      borderRadius: '20px',
      backgroundColor: '#406ae0',
      width: '40%',
      marginTop: '15px',
      height: '50px',
      alignSelf: 'center',
      transition: 'all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      '&:hover': {
        backgroundColor: '#406ae0',
        borderRadius: '10px',
        border: '2px solid #406ae0',
      },
    },
  });
});

export default useStyles;
