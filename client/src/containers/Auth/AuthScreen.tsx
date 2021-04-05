import React from 'react';

import { Button, Card, TextField, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import HashLoader from 'react-spinners/HashLoader';
import useStyles from './AuthScreenStyles';
import { useHistory } from 'react-router-dom';

import Logo from '../../images/logo.png';
import authStore from '../../stores/AuthStore';
import { useMutation } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import print from '../../print';

interface UserDataForm {
	email: string;
	password: string;
}
interface AuthServerResponse {
	email: string;
	localId: string;
}

const AuthScreen: React.FC = (props) => {
	console.log(props);
	const classes = useStyles();
	const history = useHistory();

	const isLogin = authStore((state) => state.isLogin);
	const setSignUp = authStore((state) => state.setSignUp);

	const mutation = useMutation((newuser: UserDataForm) => {
		if (isLogin) {
			console.log('signin');
			return axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC02zYRkV5eNPqQ5qHW7rYWq3_koqSUUKs',
				{ ...newuser, returnSecureToken: true }
			);
		}
		console.log('signup');
		return axios.post(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC02zYRkV5eNPqQ5qHW7rYWq3_koqSUUKs',
			{ ...newuser, returnSecureToken: true }
		);
	});

	const initialSignInValues: UserDataForm = { email: '', password: '' };

	return (
		<div className={classes.Background}>
			<Card className={classes.Card} variant='elevation' raised>
				<div className={classes.leftPortionCard}>
					<img src={Logo} className={classes.Image} alt='Logo' />
					<Typography className={classes.title} paragraph>
						Chat App
					</Typography>

					<Typography className={classes.subTitle} paragraph>
						This is a Simple Chat Room App created using React/Typescript and
						NodeJS. Login/Sign up to use this app.
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
						initialValues={initialSignInValues}
						onSubmit={(values, actions) => {
							actions.setSubmitting(true);

							mutation
								.mutateAsync(values)
								.then((response: AxiosResponse<AuthServerResponse>) => {
									print(response.data.localId);
									// after authentication go to the create chat room
									history.push(`/create-chat-room-${response.data.localId}`);
								});

							actions.setSubmitting(false);
						}}
					>
						{({ isSubmitting }) => (
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
										name='email'
										fullWidth
										label='Email'
										as={TextField}
									/>
								</div>
								<div className={classes.TextFieldStyle}>
									<Field
										variant='outlined'
										autoFocus={true}
										type='password'
										fullWidth
										label='Password'
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
		</div>
	);
};

export default AuthScreen;
