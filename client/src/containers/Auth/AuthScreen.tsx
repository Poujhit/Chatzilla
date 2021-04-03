import React from 'react';

import { Button, Card, TextField, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import useStyles from './AuthScreenStyles';

import Logo from '../../images/logo.png';
import authStore from '../../stores/AuthStore';

interface MySignInFormValues {
	mailId: string;
	password: string;
}

const AuthScreen: React.FC = (props) => {
	const classes = useStyles();

	const isLogin = authStore((state) => state.isLogin);
	const setSignUp = authStore((state) => state.setSignUp);

	const initialSignInValues: MySignInFormValues = { mailId: '', password: '' };

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
							console.log({ values, actions });
							alert(JSON.stringify(values, null, 2));
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
										name='mailId'
										fullWidth
										label='Email'
										as={TextField}
									/>
								</div>
								<div className={classes.TextFieldStyle}>
									<Field
										variant='outlined'
										autoFocus={true}
										type='input'
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
									submit
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
