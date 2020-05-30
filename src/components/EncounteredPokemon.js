import React, { useState, useContext, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import moment from 'moment';
import { FirebaseContext } from '../components/Firebase';

import { Grid, Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	card: {
		padding: '40px 20px'
	},
	image: {
		marginBottom: 0
	},
	battleContainer: {
		alignItems: 'center'
	}
});

const EncouteredPokemon = ({captured, setCaptured, logs, setLogs}) => {

	const classes = useStyles();

	const { firebase, userData, setUserData } = useContext(FirebaseContext);

	const [encountered, setEncountered] = useState([]);
	const [userActivePokemon, setUserActivePokemon] = useState({});
	const [diceBoost, setDiceBoost] = useState(1);
	const [pokeBoost, setPokeBoost] = useState(1);

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
	          combat_power
	          types
	        } 
	      } 
	    }
	  }
	`);

	const allPokemon = data.site.siteMetadata.pokemon;

	const rollDice = () => {
		const dice = [1, 2, 2, 3, 3, 4];
		const randomIndex = (Math.floor(Math.random() * dice.length));
		const multiplier = dice[randomIndex] / 100 + 1;
		setDiceBoost(multiplier);
		setLogs([...logs, `you rolled a ${dice[randomIndex]}!`]);
	};

	const fightPokemon = async (id) => {
	  const currPokemon = allPokemon.find(pokemon => pokemon.id === id);
	  const pokemonCombatPower = (userActivePokemon.combat_power * diceBoost * pokeBoost).toFixed(0);
	  const caught = (pokemonCombatPower > currPokemon.combat_power) ? true : false;
	  if (caught) {
	    setCaptured([...captured, currPokemon]);
	    setLogs([...logs, `your moral boost multiplier is: ${diceBoost}x!`, `your combat power is ${pokemonCombatPower}`, `you caught <span style="text-decoration: underline;">${currPokemon.name}</span>!`]);
	    let dateString = new Date().toUTCString();
	    dateString = dateString.split(' ').slice(0, 4).join(' ');
	    currPokemon.date_caught = dateString;
	    firebase.addCapturedPokemon(userData, setUserData, currPokemon);
	    if ([...captured, currPokemon].length === 151) {
	    	const stringDate = moment().format('ddd, DD MMMM YYYY h:mm:ss');
	    	firebase.addCompletionDate(userData, stringDate);
	    }	
	  } else {
	    setLogs([...logs, `your moral boost multiplier is: ${diceBoost}x!`, `your combat power is ${pokemonCombatPower}`, `could not capture <span style="text-decoration: underline;">${currPokemon.name}</span>`]);
	  }
	  const pokemonLeft = encountered.filter(pokemon => pokemon.id !== currPokemon.id);
	  setEncountered(pokemonLeft);
	  setDiceBoost(1);
	};

	const findPokemon = () => {
	  const allEncounteredPokemon = [];
	  let i = 0;
	  let numOfEncounters = 8;
	  // assigns number of possible encounters 
	  if (captured.length + numOfEncounters >= allPokemon.length) {
	    numOfEncounters = allPokemon.length - captured.length;
	  }
	  // find 8 pokemon
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

	useEffect(() => {
		if (userData !== null) {
			setCaptured(userData.pokemons);
			setUserActivePokemon(userData.pokemons.filter(pokemon => pokemon.active_pokemon)[0]);
		}
	}, [setCaptured, userData]);

	useEffect(() => {
		const multiplier = (captured.length / 1000) + 1;
		setPokeBoost(multiplier);
	}, [captured]);

	return (
		<>
			<Button onClick={findPokemon} variant="contained" color="primary">Encounter Pokemon</Button>

			{userActivePokemon && !!encountered.length && 
				<>
					<Grid className={classes.battleContainer} container spacing={3}>
						<Grid item xs={3}>
							<h2>{userData.username}</h2>
		      		<Card className={classes.card}>
		            <img className={classes.image} src={userActivePokemon.image} alt={userActivePokemon.name} />
		            <h3>{userActivePokemon.name}</h3>
		            {userActivePokemon.types.map((type, index) => {
		            	return <p key={index}>{type}</p>
		            })}
		            <p>CP {userActivePokemon.combat_power}</p>
		            <p>DB: {diceBoost}x</p>
		            <p>PB: {pokeBoost}x</p>
		            <p>Total CP: {(userActivePokemon.combat_power * diceBoost * pokeBoost).toFixed(0)}</p>
		      		</Card>
		      		<Button onClick={rollDice} variant="contained" color="primary">Roll Dice</Button>
		      		<Button onClick={fightPokemon.bind(this, encountered[0].id)} variant="contained" color="primary">Fight Pokemon</Button>
						</Grid>
						<Grid item xs={3}>
							VS
						</Grid>
						<Grid item xs={3}>
							<h2>Wild Pokemon</h2>
		      		<Card className={classes.card}>
		            <img className={classes.image} src={encountered[0].image} alt={encountered[0].name} />
		            <h3>{encountered[0].name}</h3>
		            {encountered[0].types.map((type, index) => {
		            	return <p key={index}>{type}</p>
		            })}
		            <p>CP {encountered[0].combat_power}</p>
		      		</Card>
						</Grid>
					</Grid>
				</>
			}
		</>
	);
};

export default EncouteredPokemon;