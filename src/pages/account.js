import React, { useContext } from "react";
import { navigate } from "gatsby"

import SEO from "../components/seo"

import { FirebaseContext } from '../components/Firebase';

import { Button, Card, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	card: {
		padding: '40px'
	},
	title: {
		textAlign: 'center'
	},
	h2: {
		textAlign: 'left'
	},
	form: {
		display: 'flex',
		flexDirection: 'column'
	},
	textInput: {
		marginBottom: '20px'
	},
	button: {
		width: '100%',
		maxWidth: '280px',
		height: '46px',
		margin: '0 auto'
	}
});

const Account = () => {
	const classes = useStyles();
	const { user, firebase, loading, userData } = useContext(FirebaseContext);

	const logout = () => {
		firebase.logout().then(() => navigate('/'));
	};

	const addPokemonTest = () => {
		const uid = user.uid;
		firebase.addCapturedPokemon(uid);
	};

	return (
	  <section>
	    <SEO title="Account" />
	    <h1>Account</h1>
	    {(() => {
	    	if (!loading && user !== null && userData !== null) {
	    		if (user === undefined) {
	    			navigate('/create-account');
	    		}

	    		return (
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
		    							<TableCell>0/151</TableCell>
		    							<TableCell>1</TableCell>
		    							<TableCell>0%</TableCell>
		    							<TableCell>Days</TableCell>
		    							<TableCell>{user.metadata.creationTime.slice(0, -13)}</TableCell>
		    							<TableCell>N/A</TableCell>
		    							<TableCell>{user.metadata.lastSignInTime.slice(0, -13)}</TableCell>
	    							</TableRow>
	    						</TableBody>
	    					</Table>
	    				</TableContainer>
	    				    				
	    				<Button onClick={addPokemonTest} type="submit" className={classes.button} variant="contained" color="primary">Add Pokemon</Button>
	    				<Button onClick={logout} type="submit" className={classes.button} variant="contained" color="primary">Logout</Button>
	    			</Card>
	    		);
	    	}
	    })()}
	  </section>
	);
};

export default Account;