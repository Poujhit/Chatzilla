import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@material-ui/core';

import useChatScreenStyles from './ChatScreenStyles';

interface MessageInputPortionProps {
	submitChat: (userTypedMessage: string) => void;
}

const MessageInputPortion: React.FC<MessageInputPortionProps> = (props) => {
	const classes = useChatScreenStyles();

	const initialValue: { message: string } = { message: '' };

	return (
		<div className={classes.MessageInputPortion}>
			<Formik
				validateOnChange={true}
				initialValues={initialValue}
				validate={(values) => {
					const errors: Record<string, string> = {};
					if (values.message.length === 0) errors.message = '';
					return errors;
				}}
				onSubmit={(values, actions) => {
					actions.setSubmitting(true);
					props.submitChat(values.message);

					values.message = '';

					actions.setSubmitting(false);
				}}
			>
				{({ isSubmitting, errors }) => (
					<Form className={classes.FormPortion}>
						<Field
							style={{
								marginLeft: '20px',
							}}
							type='input'
							name='message'
							fullWidth
							autoFocus={true}
							error={!!errors.message}
							helperText={errors.message}
							as={TextField}
						/>
						<br />
						<Button
							disabled={isSubmitting}
							className={classes.sendButton}
							type='submit'
						>
							send
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default MessageInputPortion;
