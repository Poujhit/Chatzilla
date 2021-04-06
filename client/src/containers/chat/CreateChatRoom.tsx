import React from 'react';
import { Button, Card, TextField, Typography } from '@material-ui/core';

import useCreateChatRoomStyles from './CreateChatRoomStyles';
import { useHistory } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import userDataStore from '../../stores/UserDataStore';
import PopUpDialog from '../../components/Dialog';

interface ChatRoom {
	name: string;
	room: string;
}

const CreateChatRoomScreen: React.FC = (props) => {
	const classes = useCreateChatRoomStyles();
	const history = useHistory();
	const [openDialog, setOpenDialog] = React.useState(false);

	const DialogOpen = () => {
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
	};

	const initialValues: ChatRoom = {
		name: '',
		room: '',
	};

	const userData = userDataStore((state) => state);

	return (
		<div className={classes.Background}>
			<Card className={classes.Card} variant='elevation' raised>
				<Typography className={classes.title}>Join</Typography>
				<Typography className={classes.subTitle}>
					Join or create a Room
				</Typography>
				<Formik
					initialValues={initialValues}
					onSubmit={(values, actions) => {
						actions.setSubmitting(true);
						if (!userData.isAuthenticated) DialogOpen();
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
									autoFocus={true}
									name='name'
									fullWidth
									label='User Name'
									as={TextField}
								/>
							</div>
							<div className={classes.TextFieldStyle}>
								<Field
									variant='outlined'
									fullWidth
									label='Room Name'
									name='room'
									as={TextField}
								/>
							</div>
							<Button
								disabled={isSubmitting}
								className={classes.submitButton}
								type='submit'
							>
								submit
							</Button>
						</Form>
					)}
				</Formik>
			</Card>
			<PopUpDialog
				open={openDialog}
				onClose={handleClose}
				content={
					'You are not Authenticated. So Click on OK button to go to the home page to sign In.'
				}
				title={'Warning!'}
				okButtonText={'OK'}
				notOkButtonText={'Cancel'}
				onOkHandled={() => {
					console.log('helloworld');
				}}
			/>
		</div>
	);
};

export default CreateChatRoomScreen;
