import React, { useContext, useState, useEffect } from "react";
import SEO from "../components/seo"
import moment from 'moment';

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
	    <SEO title={username} />
	    <h1>Trainer: {username}</h1>
	        {(() => {
	        	if (!loading && firebase !== null && trainer !== null) {

	        		const daysOld = moment().diff(trainer.creation_time, 'days');
	        		const completionTime = (trainer.completion_time ? moment(trainer.completion_time).format('MM/DD/YYYY') : 'N/A');
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
	    		    							<TableCell className={colorClass}>{trainer.username}</TableCell>
	    		    							{trainer.pokemons.length > 0 ? 
	    		    								<TableCell>{trainer.pokemons.length}/151</TableCell>
	    		    								:
	    		    								<TableCell>0/151</TableCell>
	    		    							}
	    		    							{trainer.pokemons.length > 0 ? 
	    		    								<TableCell>{((trainer.pokemons.length / 151) * 100).toFixed(2)}%</TableCell>
	    		    								: 
	    		    								<TableCell>0%</TableCell>
	    		    							}
	    		    							<TableCell>{daysOld} Day{daysOld === 1 ? '' : 's'}</TableCell>
	    		    							<TableCell>{moment(trainer.creation_time).format('MM/DD/YYYY')}</TableCell>
	    		    							<TableCell>{completionTime}</TableCell>
	    		    							<TableCell>{moment(trainer.last_login).format('MM/DD/YYYY')}</TableCell>
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
