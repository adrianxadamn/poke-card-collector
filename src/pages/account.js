import React, { useContext, useState } from "react";
import { navigate } from "gatsby"
import SEO from "../components/seo"

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

	const getRankings = async () => {
		const index = await firebase.getRankings(userData.username);
		setRanking(index);
	};

	return (
	  <section>
	    <SEO title="Account" />
	    <h1>Account</h1>
	    {(() => {
	    	if (!loading && firebase !== null && userData !== null) {
	    		if (user === null) {
	    			navigate('/create-account');
	    		}
	    		getRankings();
	    		return (
	    			<>
		    			<Card className={classes.card}>
		    				<h2 className={classes.h2}>Stats:</h2>
		    		
		    				<TableContainer>
		    					<Table>
		    						<TableHead>
		    							<TableRow hover>
			    							<TableCell>Name</TableCell>
			    							<TableCell>Pokedex</TableCell>
			    							<TableCell>Rank</TableCell>
			    							<TableCell>Completion</TableCell>
			    							<TableCell>Time</TableCell>
			    							<TableCell>Date Joined</TableCell>
			    							<TableCell>Completed</TableCell>
			    							<TableCell>Last Login</TableCell>
		    							</TableRow>
		    						</TableHead>
		    						<TableBody>
		    							<TableRow hover>
			    							<TableCell>{userData.username}</TableCell>
			    							{userData.pokemons.length > 0 ? 
			    								<TableCell>{userData.pokemons.length}/151</TableCell>
			    								:
			    								<TableCell>0/151</TableCell>
			    							}
			    							<TableCell>{ranking}</TableCell>
			    							{userData.pokemons.length > 0 ? 
			    								<TableCell>{((userData.pokemons.length / 151) * 100).toFixed(2)}%</TableCell>
			    								: 
			    								<TableCell>0%</TableCell>
			    							}
			    							<TableCell>Days</TableCell>
			    							<TableCell>{userData.creation_time}</TableCell>
			    							<TableCell>N/A</TableCell>
			    							<TableCell>{userData.last_login}</TableCell>
		    							</TableRow>
		    						</TableBody>
		    					</Table>
		    				</TableContainer>
		    				    			
		    				<Button onClick={findPokemon} type="submit" className={classes.button} variant="contained" color="primary">Find Pokemon</Button>
		    				<Button onClick={logout} type="submit" className={classes.button} variant="contained" color="primary">Logout</Button>
		    			</Card>

		    			{userData.pokemons.length > 0 ? <Pokedex /> : ''}
	    			</>
	    		);
	    	}
	    })()}
	  </section>
	);
};

// next step: find pokemon button to redirect you to find-pokemon page

export default Account;