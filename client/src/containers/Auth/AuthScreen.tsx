import { makeStyles, Theme, createStyles, Card } from '@material-ui/core';
import React from 'react';

const AuthScreen: React.FC = (props) => {
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
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
				width: '50%',
				height: '100%',
				backgroundColor: '#1D63DC',
				display: 'flex',
				flexDirection: 'column',
			},
		})
	);

	const classes = useStyles();

	return (
		<div className={classes.Background}>
			<Card className={classes.Card} variant='elevation' raised>
				<div className={classes.leftPortionCard}>h</div>
				<div></div>
			</Card>
		</div>
	);
};

export default AuthScreen;
