import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { CSSProperties } from 'react';

const useStyles = makeStyles((theme: Theme) => {
	const cardcontents: CSSProperties = {
		width: '50%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
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
			marginTop: '10%',
		},
		subTitle: {
			fontFamily: 'Rubik, sans-serif',
		},
	});
});

export default useStyles;
