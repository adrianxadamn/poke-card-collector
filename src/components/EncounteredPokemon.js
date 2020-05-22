import React, { useState, useContext, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import moment from 'moment';
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

const EncouteredPokemon = ({captured, setCaptured, logs, setLogs}) => {

	const classes = useStyles();

	const { firebase, userData, setUserData } = useContext(FirebaseContext);

	const [encountered, setEncountered] = useState([]);

	useEffect(() => {
		if (userData !== null) {
			setCaptured(userData.pokemons);
		}
	}, [setCaptured, userData]);

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

	const capturePokemon = async (id) => {
	  const currPokemon = allPokemon.find(pokemon => pokemon.id === id);
	  const getRandomCapturePerc = Math.floor(Math.random() * 100);
	  const caught = (getRandomCapturePerc + currPokemon.capture_rate >= 100) ? true : false;
	  console.log(`you rolled ${getRandomCapturePerc}`);
	  if (caught) {
	    setCaptured([...captured, currPokemon]);
	    console.log(`you caught ${currPokemon.name}!`);
	    setLogs([...logs, `you rolled ${getRandomCapturePerc}`, `you caught <span style="text-decoration: underline;">${currPokemon.name}</span>!`]);
	    let dateString = new Date().toUTCString();
	    dateString = dateString.split(' ').slice(0, 4).join(' ');
	    currPokemon.date_caught = dateString;
	    firebase.addCapturedPokemon(userData, setUserData, currPokemon);
	    if ([...captured, currPokemon] === 151) {
	    	const stringDate = moment().format('ddd, DD MMMM YYYY h:mm:ss');
	    	firebase.addCompletionDate(userData, stringDate);
	    }	
	  } else {
	    console.log(`could not capture ${currPokemon.name}`);
	    setLogs([...logs, `you rolled ${getRandomCapturePerc}`, `could not capture <span style="text-decoration: underline;">${currPokemon.name}</span>`]);
	  }
	  const pokemonLeft = encountered.filter(pokemon => pokemon.id !== currPokemon.id);
	  setEncountered(pokemonLeft);
	};

	const findPokemon = () => {
	  const allEncounteredPokemon = [];
	  let i = 0;
	  let numOfEncounters = 8;
	  // assigns number of possible encounters 
	  if (captured.length + numOfEncounters >= allPokemon.length) {
	    numOfEncounters = allPokemon.length - captured.length;
	  }
	  // find 7 pokemon
	  while (i < numOfEncounters) {
	    const getRandomIndex = Math.floor(Math.random() * allPokemon.length); 
	    const getRandomEncounterPerc = Math.floor(Math.random() * 100); 
	    const currPokemon = allPokemon[getRandomIndex];
	    console.log(`you rolled ${getRandomEncounterPerc}`);
	    if (getRandomEncounterPerc + currPokemon.encounter_rate < 100) {
	      console.log(`${currPokemon.name} flees from you`);
	      setLogs([...logs, `you rolled ${getRandomEncounterPerc}`, `<span style="text-decoration: underline;">${currPokemon.name}</span> flees from you`]);
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
			        return <li id={pokemon.id} key={pokemon.id}>
				        <button onClick={capturePokemon.bind(this, pokemon.id)}> 
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

export default EncouteredPokemon;