import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { CSSProperties } from 'react';

const useStyles = makeStyles((theme: Theme) => {
	const cardcontents: CSSProperties = {
		width: '50%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	};
	return createStyles({
		Background: {
			backgroundColor: '#439CEF',
			width: '100%',
			height: '100%',
			position: 'absolute',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		},
		Image: {
			height: '100px',
			width: '95px',
			marginTop: '10px',
		},
		Card: {
			width: '60%',
			height: '60%',
			display: 'flex',
			flexDirection: 'row',
		},
		leftPortionCard: {
			...cardcontents,
			backgroundColor: '#1D63DC',
		},
		rightPortionCard: {
			...cardcontents,
		},
		title: {
			fontFamily: 'Rubik, sans-serif',
			color: 'white',
			fontSize: '50px',
			fontWeight: 'bold',
			marginTop: '4%',
		},
		subTitle: {
			fontFamily: 'Rubik, sans-serif',
			fontSize: '20px',
			color: 'white',
			padding: '15px',
		},
	});
});

export default useStyles;
