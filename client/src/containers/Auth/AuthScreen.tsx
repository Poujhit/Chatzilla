import React from 'react';

import { Card, Typography } from '@material-ui/core';
import {
	Formik,
	// FormikHelpers,
	// FormikProps,
	Form,
	Field,
	// FieldProps,
} from 'formik';
import useStyles from './AuthScreenStyles';

import Logo from '../../images/logo.png';

interface MyFormValues {
	firstName: string;
}

const AuthScreen: React.FC = (props) => {
	const classes = useStyles();

	const initialValues: MyFormValues = { firstName: '' };

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
					<Formik
						initialValues={initialValues}
						onSubmit={(values, actions) => {
							console.log({ values, actions });
							alert(JSON.stringify(values, null, 2));
							actions.setSubmitting(false);
						}}
					>
						<Form>
							<label htmlFor='firstName'>First Name</label>
							<Field id='firstName' name='firstName' placeholder='First Name' />
							<button type='submit'>Submit</button>
						</Form>
					</Formik>
				</div>
			</Card>
		</div>
	);
};

export default AuthScreen;
