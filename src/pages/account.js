import React, { useContext, useState, useEffect } from "react";
import { navigate } from "gatsby"
import SEO from "../components/seo"
import moment from 'moment';

import { FirebaseContext } from '../components/Firebase';

import { Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Pokedex from '../components/Pokedex';

const useStyles = makeStyles({
	card: {
		padding: '40px',
		marginBottom: '40px'
	},
	h2: {
		textAlign: 'left'
	},
	button: {
		width: '100%',
		maxWidth: '280px',
		height: '46px',
		margin: '0 auto'
	},
	divider: {
		margin: '20px 0'
	},
	goldColor: {
		color: '#CFB53B',
		fontWeight: '700'
	},
	silverColor: {
		color: '#C0C0C0',
		fontWeight: '700'
	},
	bronzeColor: {
		color: '#8C7853',
		fontWeight: '700'
	}
});

const Account = () => {
	const classes = useStyles();
	const { user, firebase, loading, userData } = useContext(FirebaseContext);

	const [ranking, setRanking] = useState('');

	const logout = () => {
		firebase.logout().then(() => navigate('/'));
	};

	const findPokemon = () => {
		navigate('/find-pokemon');
	};

	useEffect(() => {
		const getRankings = async () => {
			const index = await firebase.getRankings(userData.username);
			setRanking(index);
		};
		if (firebase !== null && user !== null && userData !== null) {
			getRankings();
		}
	}, [firebase, user, userData]);

	return (
	  <section>
	    <SEO title="Account" />
	    <h1>Account</h1>
	    {(() => {
	    	if (!loading && firebase !== null && userData !== null) {
	    		if (user === null) {
	    			navigate('/create-account');
	    		}

	    		const daysOld = moment().diff(userData.creation_time, 'days');
	    		const completionTime = (userData.completion_time ? moment(userData.completion_time).format('MM/DD/YYYY') : 'N/A');
	    		let colorClass = ''; 
	    		if (ranking === 1) {
	    			colorClass = classes.goldColor;
	    		} else if (ranking === 2) {
	    			colorClass = classes.silverColor;
	    		} else if (ranking === 3) { 
	    			colorClass = classes.bronzeColor;
	    		}

	    		return (
	    			<>
		    			<Card className={classes.card}>
		    				<h2 className={classes.h2}>Stats:</h2>
		    		
		    				<TableContainer>
		    					<Table>
		    						<TableHead>
		    							<TableRow hover>
			    							<TableCell>Rank</TableCell>
			    							<TableCell>Name</TableCell>
			    							<TableCell>Pokedex</TableCell>
			    							<TableCell>Completion</TableCell>
			    							<TableCell>Elapsed Time</TableCell>
			    							<TableCell>Date Joined</TableCell>
			    							<TableCell>Date Completed</TableCell>
			    							<TableCell>Last Login</TableCell>
		    							</TableRow>
		    						</TableHead>
		    						<TableBody>
		    							<TableRow hover>
			    							<TableCell className={colorClass}>{ranking}</TableCell>
			    							<TableCell className={colorClass}>{userData.username}</TableCell>
			    							{userData.pokemons.length > 0 ? 
			    								<TableCell>{userData.pokemons.length}/151</TableCell>
			    								:
			    								<TableCell>0/151</TableCell>
			    							}
			    							{userData.pokemons.length > 0 ? 
			    								<TableCell>{((userData.pokemons.length / 151) * 100).toFixed(2)}%</TableCell>
			    								: 
			    								<TableCell>0%</TableCell>
			    							}
			    							<TableCell>{daysOld} Day{daysOld === 1 ? '' : 's'}</TableCell>
			    							<TableCell>{moment(userData.creation_time).format('MM/DD/YYYY')}</TableCell>
			    							<TableCell>{completionTime}</TableCell>
			    							<TableCell>{moment(userData.last_login).format('MM/DD/YYYY')}</TableCell>
		    							</TableRow>
		    						</TableBody>
		    					</Table>
		    				</TableContainer>
		    				    			
		    				<Button onClick={findPokemon} type="submit" className={classes.button} variant="contained" color="primary">Find Pokemon</Button>
		    				<Button onClick={logout} type="submit" className={classes.button} variant="contained" color="primary">Logout</Button>
		    			</Card>

		    			{userData.pokemons.length > 0 ? <Pokedex trainerData={userData} /> : ''}
	    			</>
	    		);
	    	}
	    })()}
	  </section>
	);
};

// next step: find pokemon button to redirect you to find-pokemon page

// post deployment: make sure session ends after a day or whatever to sign user out automatically

export default Account;