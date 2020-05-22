import React, { useContext } from "react";
import SEO from "../components/seo";

import { Link } from 'gatsby';

import { FirebaseContext } from '../components/Firebase';

import { Grid, Card } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import Notifications from '../components/Notifications';

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
  const { firebase } = useContext(FirebaseContext);

  return (
    <section>
      <SEO title="Home" />

      <Grid container spacing={3}>
      	<Grid item xs={9}>
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
              First, create an account. You'll then be prompted to select one of four starter Pokemon. You can only select 1 Pokemon to capture, at a time.  Only a maximum of 8 Pokemon can be encountered per day.
              <br/><br/>
              Based on your active Pokemon, you can have an elemental type advantage which will increase your chances of capturing a Pokemon. In other words, each Pokemon has a combat level percentage (%) which will be increased if they have the elemental advantage against other Pokemon.
              <br/><br/>
              You can select a different Pokemon by visiting your “Account Page” when you have captured more Pokemon.
              <br/><br/>
              <Link to="/account">Click here to sign up!</Link>
      			</p>
      		</Card>
      	</Grid>
      	<Grid item xs={3}>
      		<Card className={classes.card}>
            {!!firebase &&
              <Notifications firebase={firebase} />
            }
          </Card>
      	</Grid>
      </Grid>
    </section>
  );

};

export default IndexPage
