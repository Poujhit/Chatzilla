import React from 'react';
import {
  Button,
  Card,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';

import useStyles from './AuthScreenStyles';
import roomDataStore from 'stores/RoomDataStore';

import Logo from 'images/logo.png';
import BottomBar from 'components/BottomBar/BottomBar';

interface UserDataForm {
  username: string;
  roomname: string;
}

const AuthScreen: React.FC = () => {
  const classes = useStyles();
  const router = useHistory();
  const roomData = roomDataStore((state) => state);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  const initialSignInValues: UserDataForm = { username: '', roomname: '' };

  return (
    <div className={classes.Background}>
      <Card className={classes.Card} variant='elevation' raised>
        <div className={classes.leftPortionCard}>
          <img src={Logo} className={classes.Image} alt='Logo' />
          <Typography className={classes.title} paragraph>
            Chatzilla
          </Typography>

          <Typography className={classes.subTitle1} paragraph>
            Create chat rooms on the fly and chat with others privately.
          </Typography>
        </div>
        <div className={classes.rightPortionCard}>
          {match && (
            <Typography className={classes.title} paragraph>
              Chatzilla
            </Typography>
          )}
          <Typography
            className={classes.subTitle}
            style={{
              marginTop: match ? '20px' : '50px',
            }}
            paragraph
          >
            Join or Create a room
          </Typography>

          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
            initialValues={initialSignInValues}
            validate={(values) => {
              const errors: Record<string, string> = {};

              if (values.username.length <= 6)
                errors.username = 'User name should be more that 6 characters';
              if (values.roomname.length === 0)
                errors.roomname = 'Room name should not be empty';

              return errors;
            }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              roomData.setName(values.username);
              roomData.setRoom(values.roomname);
              actions.setSubmitting(false);
              router.push(`/chat-room/${values.roomname}`);
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  marginTop: '10px',
                }}
              >
                <div className={classes.TextFieldStyle}>
                  <Field
                    variant='outlined'
                    type='input'
                    autoFocus={true}
                    name='username'
                    fullWidth
                    label='User name'
                    error={!!errors.username}
                    helperText={errors.username}
                    as={TextField}
                  />
                </div>
                <div className={classes.TextFieldStyle}>
                  <Field
                    variant='outlined'
                    type='roomname'
                    fullWidth
                    error={!!errors.roomname}
                    label='Room Name'
                    helperText={errors.roomname}
                    name='roomname'
                    as={TextField}
                  />
                </div>
                <Button
                  disabled={isSubmitting}
                  className={classes.LoginorSignupButton}
                  type='submit'
                >
                  submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <BottomBar />
      </Card>
    </div>
  );
};

export default AuthScreen;
