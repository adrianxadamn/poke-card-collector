import React, { useState, useContext, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import moment from 'moment';
import { FirebaseContext } from '../components/Firebase';
import { ElementalTypes } from  '../common/ElementalTypes';
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
	const [userActivePokemon, setUserActivePokemon] = useState(null);
	const [diceBoost, setDiceBoost] = useState(1);
	const [pokeBoost, setPokeBoost] = useState(1);
	const [elementalBoost, setElementalBoost] = useState(0);

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
		setLogs([...logs, `you rolled a ${dice[randomIndex]}!`, `your dice boost multiplier is: ${diceBoost}x!`]);
	};

	const fightPokemon = async (id) => {
	  const wildPokemon = allPokemon.find(pokemon => pokemon.id === id);
	  // wild pokemon should have boosted stats as well for elemental advantage
	  const pokemonCombatPower = (userActivePokemon.combat_power * diceBoost * pokeBoost * elementalBoost).toFixed(0);
	  const caught = (pokemonCombatPower > wildPokemon.combat_power) ? true : false;
	  if (caught) {
	    setCaptured([...captured, wildPokemon]);
	    setLogs([...logs, `your combat power is ${pokemonCombatPower}`, `you caught <span style="text-decoration: underline;">${wildPokemon.name}</span>!`]);
	    let dateString = new Date().toUTCString();
	    dateString = dateString.split(' ').slice(0, 4).join(' ');
	    wildPokemon.date_caught = dateString;
	    firebase.addCapturedPokemon(userData, setUserData, wildPokemon);
	    if ([...captured, wildPokemon].length === 151) {
	    	const stringDate = moment().format('ddd, DD MMMM YYYY h:mm:ss');
	    	firebase.addCompletionDate(userData, stringDate);
	    }	
	  } else {
	    setLogs([...logs, `your dice boost multiplier is: ${diceBoost}x!`, `your combat power is ${pokemonCombatPower}`, `could not capture <span style="text-decoration: underline;">${wildPokemon.name}</span>`, '---']);
	  }
	  const pokemonLeft = encountered.filter(pokemon => pokemon.id !== wildPokemon.id);
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
	    if (getRandomEncounterPerc + currPokemon.encounter_rate < 100) {
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

	const getElementalAdvantage = (activePokemonTypes, wildPokemonTypes, keyName) => {
		return activePokemonTypes.map(activePokemonType => {
			return wildPokemonTypes.filter(wildPokemonType => {
				return ElementalTypes[activePokemonType][keyName].includes(wildPokemonType);
			});
		}); 
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

	useEffect(() => {
		if (encountered.length && userActivePokemon) {
			const activePokemonTypes = userActivePokemon.types.map(type => type);
			const wildPokemonTypes = encountered[0].types.map(type => type);
			const isEffective = getElementalAdvantage(activePokemonTypes, wildPokemonTypes, 'superEffective').flat();
			const isNotEffective = getElementalAdvantage(activePokemonTypes, wildPokemonTypes, 'notEffective').flat();
			const hasNoDamage = getElementalAdvantage(activePokemonTypes, wildPokemonTypes, 'noDamage').flat();
			if (hasNoDamage.length > 0) {
				setElementalBoost(0);
			} else {
				const multiplier = (isEffective.length - isNotEffective.length) / 4 + 1;
				console.log("multiplier:", multiplier);
				setElementalBoost(multiplier);
			}
			setLogs([`you've encountered <span style="text-decoration: underline;">${encountered[0].name}</span>`]);
		}
	}, [userActivePokemon, encountered, setLogs]);

	return (
		<>
			{userData && userActivePokemon && 
					<Card>
						<Button onClick={findPokemon} variant="contained" color="primary">Encounter Pokemon</Button>
						<Grid className={classes.battleContainer} container spacing={3}>
							<Grid item xs={3}>
								<h2>{userData.username}</h2>
			      		<div className={classes.card}>
			            <img className={classes.image} src={userActivePokemon.image} alt={userActivePokemon.name} />
			            <h3>{userActivePokemon.name}</h3>
			            <div>
				            {userActivePokemon.types.map((type, index) => {
				            	return <span className={`element element--${type}`} key={index}>{type}</span>
				            })}
			            </div>
			            <p>CP {userActivePokemon.combat_power * elementalBoost} <span className={'elemental-advatange'}>({(elementalBoost - 1 > 0 ? '+' : '' )}{(elementalBoost - 1) * 100}%)</span></p>
			            <p>DB: {diceBoost}x</p>
			            <p>PB: {pokeBoost}x</p>
			            <p>Total CP: {(userActivePokemon.combat_power * diceBoost * pokeBoost * elementalBoost).toFixed(0)}</p>
			      		</div>
							</Grid>
							{!!encountered.length &&
								<>
									<Grid item xs={3}>
										<div>VS</div>
										<Button onClick={rollDice} variant="contained" color="primary">Roll Dice</Button>
										<Button onClick={fightPokemon.bind(this, encountered[0].id)} variant="contained" color="primary">Fight Pokemon</Button>
									</Grid>
									<Grid item xs={3}>
										<h2>Wild Pokemon</h2>
					      		<div className={classes.card}>
					            <img className={classes.image} src={encountered[0].image} alt={encountered[0].name} />
					            <h3>{encountered[0].name}</h3>
					            {encountered[0].types.map((type, index) => {
					            	return <span className={`element element--${type}`} key={index}>{type}</span>
					            })}
					            <p>CP {encountered[0].combat_power}</p>
					      		</div>
									</Grid>
								</>
							}
						</Grid>
					</Card>
			}
		</>
	);
};

export default EncouteredPokemon;