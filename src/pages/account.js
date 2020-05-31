import React, { useContext, useState, useEffect } from "react";
import { navigate } from "gatsby"
import SEO from "../components/seo"

import { FirebaseContext } from '../components/Firebase';

import TrainerTable from '../components/TrainerTable';
import Pokedex from '../components/Pokedex';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	button: {
		width: '100%',
		maxWidth: '280px',
		height: '46px',
		margin: '0 auto'
	}
});

const Account = () => {
	const classes = useStyles();
	const { user, firebase, loading, userData, setUserData } = useContext(FirebaseContext);
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
	    		return (
	    			<>
	    				<Button onClick={findPokemon} type="submit" className={classes.button} variant="contained" color="primary">Find Pokemon</Button>
	    				<Button onClick={logout} type="submit" className={classes.button} variant="contained" color="primary">Logout</Button>
	    				
	    				<TrainerTable users={new Array(userData)} ranking={ranking} />
		    			{userData.pokemons.length > 0 ? <Pokedex trainerData={userData} setUserData={setUserData} /> : ''}
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