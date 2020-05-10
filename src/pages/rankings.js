import React, { useContext, useState, useEffect } from "react";
import SEO from "../components/seo"

import { FirebaseContext } from '../components/Firebase';

import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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


const Rankings = () => {

	const classes = useStyles();
	const { firebase, loading } = useContext(FirebaseContext);

	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getAllUsers = async () => {
			const users = await firebase.getAllUsers('rank');
			setUsers(users);
		};
		if (firebase !== null) {
			getAllUsers(users);
		}
	}, [firebase, users]);

	return (
	  <section>
	    <SEO title="Rankings" />
	    <h1>Rankings</h1>


	    {(() => {
	    	if (!loading && firebase !== null) {

	    		return (
	    			<>
		    			<Card className={classes.card}>

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
	    								{
	    									users.map((user, index) => {
	    										return (
					    							<TableRow hover key={user.user_id}>
						    							<TableCell>{user.username}</TableCell>
						    							{user.pokemons.length > 0 ? 
						    								<TableCell>{user.pokemons.length}/151</TableCell>
						    								:
						    								<TableCell>0/151</TableCell>
						    							}
						    							<TableCell>{index + 1}</TableCell>
						    							{user.pokemons.length > 0 ? 
						    								<TableCell>{((user.pokemons.length / 151) * 100).toFixed(2)}%</TableCell>
						    								: 
						    								<TableCell>0%</TableCell>
						    							}
						    							<TableCell>Days</TableCell>
						    							<TableCell>{user.creation_time}</TableCell>
						    							<TableCell>N/A</TableCell>
						    							<TableCell>{user.last_login}</TableCell>
					    							</TableRow>
	    										)
	    									})
	    								}
		    						</TableBody>
		    					</Table>
		    				</TableContainer>
		    				    			
		    			</Card>
	    			</>
	    		);
	    	}
	    })()}

	  </section>
	)
};

export default Rankings;

// add sorting feature
