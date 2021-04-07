import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { CSSProperties } from 'react';

const useChatScreenStyles = makeStyles((theme: Theme) => {
	const cardcontents: CSSProperties = {
		width: '50%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	};

	return createStyles({
		Background: {
			backgroundColor: '#050934',
			width: '100%',
			height: '100%',
			position: 'absolute',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		},
		Card: {
			width: '60%',
			height: '80%',
			backgroundColor: '#D6FEFF',
			display: 'flex',
			flexDirection: 'row',
		},
		leftPortionOfCard: {
			...cardcontents,
			postion: 'fixed',
			backgroundColor: '#032470',
		},
		chatPortion: {
			...cardcontents,
		},
		title: {
			fontFamily: 'Rubik, sans-serif',
			color: 'white',
			fontSize: '30px',
			fontWeight: 'bold',
			marginTop: '5%',
		},
		subTitle: {
			fontFamily: 'Rubik, sans-serif',
			fontSize: '20px',
			marginBottom: '25px',
			color: 'black',
			// padding: '15px',
		},
		TextFieldStyle: {
			margin: '10px 20px',
			backgroundColor: '#D6FEFF',
		},
		statusBar: {
			backgroundColor: '#0656D9',
			height: '60px',
			width: '100%',
		},
		submitButton: {
			borderRadius: '20px',
			backgroundColor: '#1D63DC',
			color: 'white',
			width: '40%',
			marginTop: '25px',
			height: '50px',
			alignSelf: 'center',
			'&:hover': {
				color: 'black',
				borderRadius: '20px',
				border: '2px solid #1D63DC',
			},
		},
	});
});

export default useChatScreenStyles;
