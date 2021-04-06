import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useChatScreenStyles = makeStyles((theme: Theme) => {
	return createStyles({
		Background: {
			backgroundColor: '#094198',
			width: '100%',
			height: '100%',
			position: 'absolute',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		},
		Card: {
			width: '30%',
			height: '60%',
			backgroundColor: '#D6FEFF',
			display: 'flex',

			flexDirection: 'column',
			alignItems: 'center',
			// justifyContent: 'center',
		},
		title: {
			fontFamily: 'Rubik, sans-serif',
			color: 'black',
			fontSize: '50px',
			fontWeight: 'bold',
			marginTop: '4%',
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
