import React, { useContext, useState, useEffect } from "react";
import SEO from "../components/seo"

import { FirebaseContext } from '../components/Firebase';

import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
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

const Trainer = (props) => {

	const classes = useStyles();
	const { firebase, loading } = useContext(FirebaseContext);

	const [ranking, setRanking] = useState('');
	const [trainer, setTrainer] = useState(null);

	let username = props['*'];

	useEffect(() => {

		const getRankings = async () => {
			const index = await firebase.getRankings(username);
			setRanking(index);
		};

		const getUser = async () => {
			const trainer = await firebase.getUserDocByUsername({
				username: username
			});
			setTrainer(trainer);
		};

		if (firebase !== null) {
			getUser();
			getRankings();
		}

	}, [firebase, username]);

	return (
	  <section>
	    <SEO title="Your Trainer" />
	    <h1>Your Trainer</h1>
	        {(() => {
	        	if (!loading && firebase !== null && trainer !== null) {

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
	    		    							<TableCell>{trainer.username}</TableCell>
	    		    							{trainer.pokemons.length > 0 ? 
	    		    								<TableCell>{trainer.pokemons.length}/151</TableCell>
	    		    								:
	    		    								<TableCell>0/151</TableCell>
	    		    							}
	    		    							<TableCell>{ranking}</TableCell>
	    		    							{trainer.pokemons.length > 0 ? 
	    		    								<TableCell>{((trainer.pokemons.length / 151) * 100).toFixed(2)}%</TableCell>
	    		    								: 
	    		    								<TableCell>0%</TableCell>
	    		    							}
	    		    							<TableCell>Days</TableCell>
	    		    							<TableCell>{trainer.creation_time}</TableCell>
	    		    							<TableCell>N/A</TableCell>
	    		    							<TableCell>{trainer.last_login}</TableCell>
	    	    							</TableRow>
	    	    						</TableBody>
	    	    					</Table>
	    	    				</TableContainer>
	    	    				    			
	    	    			</Card>

	    	    			{trainer.pokemons.length > 0 ? <Pokedex trainerData={trainer} /> : ''}
	        			</>
	        		);
	        	}
	        })()}
	  </section>
	);
}

export default Trainer;
