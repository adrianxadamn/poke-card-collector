import React, { useContext } from "react";
import { Link, navigate } from "gatsby"

import SEO from "../components/seo"

import { FirebaseContext } from '../components/Firebase';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	card: {
		padding: '40px'
	},
	title: {
		textAlign: 'center'
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
	const { user, firebase, loading } = useContext(FirebaseContext);

	const logout = () => {
		firebase.logout().then(() => navigate('/'));
	};

	return (
	  <section>
	    <SEO title="Account" />
	    <h1>Account</h1>
	    <Link to="/">Go back to the homepage</Link>
	    {(() => {
	    	if (!loading) {
	    		if (user === undefined) {
	    			navigate('/create-account');
	    		}
	    		return (
	    			<>
	    				<div>Loaded</div>
	    				<Button onClick={logout} type="submit" className={classes.button} variant="contained" color="primary">Logout</Button>
	    			</>
	    		);
	    	}
	    })()}
	  </section>
	);
};

export default Account;