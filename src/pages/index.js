import React from "react";
import SEO from "../components/seo";

import { Link } from 'gatsby';

import { Grid, Card } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	card: {
		padding: '20px',
		marginBottom: '40px'
	},
	h2: {
		textAlign: 'left'
	}
});

const IndexPage = () => {

	const classes = useStyles();

  return (
    <section>
      <SEO title="Home" />

      <Grid container spacing={3}>
      	<Grid item xs={8}>
      		<Card className={classes.card}>
      			<h2 className={classes.h2}>Welcome to Poke Card Collector!</h2>
      			<p>Join the ranks and capture all 151 pokemons as quickly as you can!</p>
      			<p>To those who have captured all 151 pokemon will be given these rewards:</p>
      			<ul>
      				<li>First - $20</li>
      				<li>Second - $10</li>
      				<li>Third - $5</li>
      			</ul>
      		</Card>
      		<Card className={classes.card}>
      			<h2 className={classes.h2}>How to play:</h2>
      			<p>
      				First, create an account and then you'll be prompted to select one of four starter pokemon. 
      				You can only select 1 pokemon at a time to capture pokemon and are only allowed to encounter 
      				a max of 8 pokemon a day. 
      				<br/><br/>
      				Based on your active pokemon, you could have an elemental type advantage which 
      				will increase your chances of capturing a pokemon. In other words, each pokemon has a combat level 
      				percentage (%) which will be increased if they have the elemental advantage against other pokemon. 
      				<br/><br/>
      				You can select a different pokemon by visiting your Account page when you have capture more pokemon.
      				<br/><br/>
      				<Link to="/account">Click here to sign up!</Link>
      			</p>
      		</Card>
      	</Grid>
      	<Grid item xs={4}>
      		<Card className={classes.card}>Sidebar Info Ticker</Card>
      	</Grid>
      </Grid>
    </section>
  );

};

export default IndexPage
