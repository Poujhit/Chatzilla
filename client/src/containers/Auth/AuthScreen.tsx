import React from 'react';
import {
  Button,
  Card,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import HashLoader from 'react-spinners/HashLoader';
import { useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

import useStyles from './AuthScreenStyles';
import authStore from '../../stores/AuthStore';
import userDataStore from '../../stores/UserDataStore';

import Logo from '../../images/logo.png';

interface UserDataForm {
  email: string;
  password: string;
}
interface AuthServerResponse {
  email: string;
  localId: string;
}

const AuthScreen: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [openAlert, setOpenAlert] = React.useState(false);

  const isLogin = authStore((state) => state.isLogin);
  const setSignUp = authStore((state) => state.setSignUp);
  const userData = userDataStore((state) => state);

  const initialSignInValues: UserDataForm = { email: '', password: '' };

  const mutation = useMutation((newuser: UserDataForm) => {
    if (isLogin) {
      return axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBD-EY5kP_JCZdidMY5TFKPm3OyY5Cpd08',
        { ...newuser, returnSecureToken: true }
      );
    }
    return axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBD-EY5kP_JCZdidMY5TFKPm3OyY5Cpd08',
      { ...newuser, returnSecureToken: true }
    );
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <div className={classes.Background}>
      <Card className={classes.Card} variant='elevation' raised>
        <div className={classes.leftPortionCard}>
          <img src={Logo} className={classes.Image} alt='Logo' />
          <Typography className={classes.title} paragraph>
            ChatZilla
          </Typography>

          <Typography className={classes.subTitle} paragraph>
            A Private Chat Room App. Login/Sign up to use this app.
          </Typography>
        </div>
        <div className={classes.rightPortionCard}>
          <Typography
            className={classes.title}
            style={{
              color: 'black',
              marginTop: '50px',
            }}
            paragraph
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Typography>

          <Formik
            validateOnChange={true}
            initialValues={initialSignInValues}
            validate={(values) => {
              const errors: Record<string, string> = {};
              const regexp = new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );

              if (!regexp.test(values.email)) errors.email = 'Email Invalid';
              if (values.password.length <= 6)
                errors.password = 'Password length should be greater than 6.';
              return errors;
            }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);

              mutation
                .mutateAsync(values)
                .then((response: AxiosResponse<AuthServerResponse>) => {
                  userData.setEmail(response.data.email);
                  userData.setUserId(response.data.localId);
                  userData.setIsAuthenticated(true);

                  history.push(`/create-chat-room-${response.data.localId}`);
                })
                .catch((_) => setOpenAlert(true));

              actions.setSubmitting(false);
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
                    name='email'
                    fullWidth
                    label='Email'
                    error={!!errors.email}
                    helperText={errors.email}
                    as={TextField}
                  />
                </div>
                <div className={classes.TextFieldStyle}>
                  <Field
                    variant='outlined'
                    type='password'
                    fullWidth
                    error={!!errors.password}
                    label='Password'
                    helperText={errors.password}
                    name='password'
                    as={TextField}
                  />
                </div>
                <Button
                  disabled={isSubmitting}
                  className={classes.LoginorSignupButton}
                  type='submit'
                >
                  {mutation.isLoading ? (
                    <HashLoader
                      loading={mutation.isLoading}
                      size={35}
                      color='black'
                    />
                  ) : (
                    'submit'
                  )}
                </Button>
              </Form>
            )}
          </Formik>

          <Button
            style={{
              marginBottom: '15px',
            }}
            onClick={() => setSignUp(!isLogin)}
          >
            {isLogin ? 'Sign up instead' : 'sign in instead'}
          </Button>
        </div>
      </Card>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            Password or Email is wrong or you have already sign-up with our
            service.
          </div>
        }
      />
    </div>
  );
};

export default AuthScreen;
