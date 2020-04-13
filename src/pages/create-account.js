import React, { useState, useContext } from "react";
import { Link, navigate } from "gatsby"
import SEO from "../components/seo"

import { FirebaseContext } from '../components/Firebase';

import { Container, TextField, Button, Card } from '@material-ui/core';
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

const CreateAccount = () => {

	const [formData, setformData] = useState({});
	const classes = useStyles();
	const { firebase } = useContext(FirebaseContext);

	const onRegister = async () => {
		console.log("formData:", formData);
		console.log("firebase:", firebase);
		const {username, email, password} = formData;
		try {
			await firebase.register(username, email, password);
			navigate('/account');
		} catch(error) {
			console.log(error);
			alert(error.message);
		}
	};

	const submitForm = (event) => {
		event.preventDefault();
		onRegister();
	};

	const handleChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		const data = formData || {};
		data[name] = value;
		setformData(data);
	};

	return (
	  <section>
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
	  </section>
	);
};

export default CreateAccount;

