import React, { useState, useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";

import { FirebaseContext } from '../components/Firebase';

import { Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	card: {
		padding: '40px 20px'
	},
	image: {
		marginBottom: 0
	}
});

const EncouteredPokemoned = ({captured, setCaptured}) => {

	const classes = useStyles();

	const { firebase, userData, setUserData } = useContext(FirebaseContext);

	const [encountered, setEncountered] = useState([]);

	const data = useStaticQuery(graphql`
	  query pokemon {
	    site {
	      siteMetadata {
	        pokemon {
	          name
	          id
	          image
	          encounter_rate
	          capture_rate
	        } 
	      } 
	    }
	  }
	`);

	const allPokemon = data.site.siteMetadata.pokemon;

	const capturePokemon = (id) => {
	  const currPokemon = allPokemon.find(pokemon => pokemon.id === id);
	  const getRandomCapturePerc = Math.floor(Math.random() * 100);
	  const caught = (getRandomCapturePerc + currPokemon.capture_rate >= 100) ? true : false;
	  if (caught) {
	    setCaptured([...captured, currPokemon]);
	    console.log(`You caught, ${currPokemon.name}!`);
	    let dateString = new Date().toUTCString();
	    dateString = dateString.split(' ').slice(0, 4).join(' ');
	    currPokemon.date_caught = dateString;
	    firebase.addCapturedPokemon(userData, setUserData, currPokemon);
	  } else {
	    console.log(`Could not capture, ${currPokemon.name}`);
	  }
	  const pokemonLeft = encountered.filter(pokemon => pokemon.id !== currPokemon.id);
	  setEncountered(pokemonLeft);
	};

	const findPokemon = () => {
	  const allEncounteredPokemon = [];
	  let i = 0;
	  let numOfEncounters = 7;
	  // assigns number of possible encounters 
	  if (captured.length + numOfEncounters >= allPokemon.length) {
	    numOfEncounters = allPokemon.length - captured.length;
	  }
	  // find 7 pokemon
	  while (i < numOfEncounters) {
	    const getRandomIndex = Math.floor(Math.random() * allPokemon.length); 
	    const getRandomEncounterPerc = Math.floor(Math.random() * 100); 
	    const currPokemon = allPokemon[getRandomIndex];
	    if (getRandomEncounterPerc + currPokemon.encounter_rate < 100) {
	      console.log(currPokemon.name, 'flees from you');
	      continue;
	    }
	    const pokemonAlreadyFound = allEncounteredPokemon.some(pokemon => pokemon.id === currPokemon.id);
	    const pokemonAlreadyCaught = captured.some(pokemon => pokemon.id === currPokemon.id);
	    // only add to array if pokemon hasn't been found and hasn't been caught
	    if (!pokemonAlreadyFound && !pokemonAlreadyCaught) {
	      allEncounteredPokemon.push(currPokemon);
	      i++;
	    }
	    console.log('loop');
	  }
	  setEncountered(allEncounteredPokemon);
	}; 

	return (
		<>
			<Button onClick={findPokemon} variant="contained" color="primary">Encounter Pokemon</Button>

			<div className="encountered">
			  <h2>You've encountered these Pokemon!</h2>
			  <ul className="encountered-pokemon">
			    {
			      encountered.map(pokemon => {
			        return <li>
				        <button onClick={capturePokemon.bind(this, pokemon.id)} id={pokemon.id} key={pokemon.id}> 
			        		<Card className={classes.card}>
				            <img className={classes.image} src={pokemon.image} alt={pokemon.name} />
				            <h3>{pokemon.name}</h3>
				            <div>Capture!</div>
			        		</Card>
				        </button>
			        </li>
			      })
			    }
			  </ul>
			</div>
		</>
	);
};

export default EncouteredPokemoned;