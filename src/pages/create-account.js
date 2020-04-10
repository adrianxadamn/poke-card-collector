import React, { useState, useEffect } from "react";
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, TextField, Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import firebase from '../components/firebase';
import axios from '../config/axios-accounts';

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

const CreateAccount = () => {

	const [formData, setformData] = useState({});

	const classes = useStyles();

	const submitForm = (event) => {
		event.preventDefault();
		console.log("formData:", formData);
		// axios.post('/accounts.json', formData);
		const {username, email, password} = formData;

		console.log("firebase:", firebase);

		firebase.register(username, email, password);
	};

	const handleChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		const data = formData || {};
		data[name] = value;
		setformData(data);
	};

	useEffect(() => {
		console.log("formData:", formData);
	}, [formData]); 

	return (
	  <Layout>
	    <SEO title="Create Account" />

	    <Container maxWidth="sm">
	    	<Card className={classes.card}>
	    		<h1 className={classes.title}>Create Account</h1>
		    	<form className={classes.form} autoComplete="off">
		    	  <TextField onChange={handleChange} className={classes.textInput} id="username" name="username" label="Username" variant="outlined" />
		    	  <TextField type="email" onChange={handleChange} className={classes.textInput} id="email" name="email" label="Email" variant="outlined" />
		    	  <TextField type="password" onChange={handleChange} className={classes.textInput} id="password" name="password" label="Password" variant="outlined" />
	    			<Button onClick={submitForm} type="submit" className={classes.button} variant="contained" color="primary">Submit</Button>
		    	</form>
	    	</Card>

	    </Container>

	    <Link to="/">Go back to the homepage</Link>
	  </Layout>
	);
};

export default CreateAccount;

