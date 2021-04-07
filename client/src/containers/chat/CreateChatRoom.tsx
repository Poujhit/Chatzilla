import React from 'react';
import { Button, Card, TextField, Typography } from '@material-ui/core';

import useCreateChatRoomStyles from './CreateChatRoomStyles';
import { useHistory } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import userDataStore from '../../stores/UserDataStore';
import PopUpDialog from '../../components/Dialog';
import roomDataStore from '../../stores/RoomDataStore';

interface ChatRoom {
	username: string;
	room: string;
}

const CreateChatRoomScreen: React.FC = (props) => {
	const classes = useCreateChatRoomStyles();
	const history = useHistory();
	const [openDialog, setOpenDialog] = React.useState(false);
	const userData = userDataStore((state) => state);
	const roomData = roomDataStore((state) => state);
	const roomName = roomDataStore((state) => state.room);
	const setRoomName = roomDataStore((state) => state.setRoom);

	const DialogOpen = () => {
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
	};

	const initialValues: ChatRoom = {
		username: '',
		room: '',
	};

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
						if (!userData.isAuthenticated) {
							actions.setSubmitting(false);
							DialogOpen();
							return;
						}

						console.log(values);
						roomData.setName(values.username);
						roomData.setRoom(values.room);
						actions.setSubmitting(false);
						history.push(`/chat-room${values.room}`);
					}}
					validate={(values) => {
						const errors: Record<string, string> = {};

						if (values.username.length <= 6)
							errors.name = 'User name should be more that 6 characters.';
						if (values.room.length === 0)
							errors.room = 'Room name should not be empty.';
						return errors;
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
									helperText={errors.username}
									error={!!errors.username}
									label='User Name'
									as={TextField}
								/>
							</div>
							<div className={classes.TextFieldStyle}>
								<Field
									variant='outlined'
									fullWidth
									helperText={errors.room}
									error={!!errors.room}
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
					'You are not Authenticated. So Click on OK button to go to the Home page to sign In.'
				}
				title={'Warning!'}
				okButtonText={'OK'}
				notOkButtonText={'Cancel'}
				onOkHandled={() => {
					history.replace('/');
				}}
			/>
		</div>
	);
};

export default CreateChatRoomScreen;
