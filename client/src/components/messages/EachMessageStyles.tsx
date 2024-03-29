import { makeStyles } from 'tss-react/mui';

const eachMessageStyles = makeStyles()(() => ({
  myMessageContainer: {
    display: 'flex',
    padding: '0.5%',
    marginTop: '10px',
    marginLeft: '10px',
  },
  myMessageTextBox: {
    backgroundColor: '#406ae0',
    borderRadius: '20px',
    padding: '5px 20px',
    maxWidth: '70%',
  },
  otherMessageTextBox: {
    backgroundColor: '#272A47',
    borderRadius: '20px',
    padding: '5px 20px',
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
}));

export default eachMessageStyles;
