import React, { useState, useContext, useEffect, useCallback } from "react";
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
	const [userDiceBoost, setUserDiceBoost] = useState(1);
	const [userPokeBoost, setUserPokeBoost] = useState(1);
	const [userElementalBoost, setUserElementalBoost] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const [wildDiceBoost, setWildDiceBoost] = useState(1);
	const [wildElementalBoost, setWildElementalBoost] = useState(0);

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

	const resetState = () => {
		setUserDiceBoost(1);
		setUserElementalBoost(0);
		setWildElementalBoost(0);
		setIsLoading(false);
	};

	const rollDice = () => {
		const dice = [1, 2, 2, 3, 3, 4];
		const randomIndex = (Math.floor(Math.random() * dice.length));
		const multiplier = dice[randomIndex] / 100 + 1;
		setUserDiceBoost(multiplier);
		setLogs([...logs, `you rolled a ${dice[randomIndex]}!`, `your dice boost multiplier is: ${userDiceBoost}x!`]);
	};

	const getTierLevel = (combatPower) => {
		if (combatPower > 4000) {
			return (100 / 25);
		} else if (combatPower > 3000) {
			return (100 / 20);
		} else if (combatPower > 2000) {
			return (100 / 15);
		} else if (combatPower > 1000) {
			return (100 / 10);
		} else {
			return (100 / 5);
		}
	};

	const fightPokemon = async (id) => {
		setIsLoading(true);
	  const wildPokemon = allPokemon.find(pokemon => pokemon.id === id);
	  const wildPokemonCP = (wildPokemon.combat_power * wildElementalBoost);
	  const pokemonCP = (userActivePokemon.combat_power * userDiceBoost * userPokeBoost * userElementalBoost);
	  const caught = (pokemonCP > wildPokemonCP) ? true : false;
	  if (caught) {
	    setCaptured([...captured, wildPokemon]);
	    setLogs([...logs, `your combat power is ${pokemonCP.toFixed(0)}`, `you caught <span style="text-decoration: underline;">${wildPokemon.name}</span>!`]);
	    let dateString = new Date().toUTCString();
	    dateString = dateString.split(' ').slice(0, 4).join(' ');
	    wildPokemon.date_caught = dateString;
	    await firebase.addCapturedPokemon(userData, setUserData, wildPokemon);
	    if ([...captured, wildPokemon].length === 151) {
	    	const stringDate = moment().format('ddd, DD MMMM YYYY h:mm:ss');
	    	await firebase.addCompletionDate(userData, stringDate);
	    }
	  } else {
	  	await firebase.updateBattleLosses(userData);
	    setLogs([...logs, `your dice boost multiplier is: ${userDiceBoost}x!`, `your combat power is ${pokemonCP.toFixed(0)}`, `could not capture <span style="text-decoration: underline;">${wildPokemon.name}</span>`, '---']);
	  }
	  const pokemonLeft = encountered.filter(pokemon => pokemon.id !== wildPokemon.id);
	  setEncountered([...pokemonLeft]);
	  resetState();
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

	const getElementalAdvantage = (pokemonA, pokemonB, keyName) => {
		const pokemonATypes = pokemonA.types.map(type => type);
		const pokemonBTypes = pokemonB.types.map(type => type);
		return pokemonATypes.map(pokemonAType => {
			return pokemonBTypes.filter(pokemonBType => {
				return ElementalTypes[pokemonAType][keyName].includes(pokemonBType);
			});
		}); 
	};

	const getPlayerElementalAdvantage = useCallback((pokemonA, pokemonB, player) => {
		const isEffective = getElementalAdvantage(pokemonA, pokemonB, 'superEffective').flat();
		const isNotEffective = getElementalAdvantage(pokemonA, pokemonB, 'notEffective').flat();
		const difference = (isEffective.length - isNotEffective.length > 0) ? 'positive' : 'negative';
		let percentage = 0;
		if (difference === 'positive') {
			percentage = getTierLevel(pokemonA.combat_power);
		} else if (difference === 'negative') {
			percentage = getTierLevel(pokemonB.combat_power);
		}
		const multiplier = (isEffective.length - isNotEffective.length) / percentage + 1;
		if (player === 'user') {
			setUserElementalBoost(multiplier);
		} else if ('opponent') {
			setWildElementalBoost(multiplier);
		}
	}, []);

	useEffect(() => {
		if (userData !== null) {
			setCaptured(userData.pokemons);
			setUserActivePokemon(userData.pokemons.filter(pokemon => pokemon.active_pokemon)[0]);
		}
	}, [setCaptured, userData]);

	useEffect(() => {
		const multiplier = (captured.length / 1000) + 1;
		setUserPokeBoost(multiplier.toFixed(3));
	}, [captured]);

	useEffect(() => {
		if (encountered.length && userActivePokemon && !isLoading) {
			getPlayerElementalAdvantage(userActivePokemon, encountered[0], 'user');
			getPlayerElementalAdvantage(encountered[0], userActivePokemon, 'opponent');
			setLogs([`you've encountered <span style="text-decoration: underline;">${encountered[0].name}</span>`]);
		}
	}, [userActivePokemon, encountered, setLogs, isLoading, getPlayerElementalAdvantage]);

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
			            {!!encountered.length &&
			            	<>
					            <p>
					            	<span>CP {(userActivePokemon.combat_power * userElementalBoost).toFixed(0)}</span> 
					            	{(() => {
					            		if (userElementalBoost - 1 > 0) {
					            			return <span className="elemental-advatange">(+{((userElementalBoost - 1) * 100).toFixed(0)}%)</span>;
					            		} else if (userElementalBoost - 1 < 0) {
					            			return <span className="elemental-disadvantage">({((userElementalBoost - 1) * 100).toFixed(0)}%)</span>;
					            		}
					            	})()}
					            </p>
					            <p>DB: {userDiceBoost}x</p>
					            <p>PB: {userPokeBoost}x</p>
					            <p>Total CP: {(userActivePokemon.combat_power * userDiceBoost * userPokeBoost * userElementalBoost).toFixed(0)}</p>
				            </>
			            }
			      		</div>
							</Grid>
							{!!encountered.length && !isLoading &&
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
					            <p>
					            	<span>CP {(encountered[0].combat_power * wildElementalBoost).toFixed(0)}</span>
					            	{(() => {
					            		if (wildElementalBoost - 1 > 0) {
					            			return <span className="elemental-advatange">(+{((wildElementalBoost - 1) * 100).toFixed(0)}%)</span>;
					            		} else if (wildElementalBoost - 1 < 0) {
					            			return <span className="elemental-disadvantage">({((wildElementalBoost - 1) * 100).toFixed(0)}%)</span>;
					            		}
					            	})()}
					            </p>
					            <p>DB: {wildDiceBoost}x</p>
					            <p>PB: 1x</p>
					            <p>Total CP: {(encountered[0].combat_power * wildDiceBoost * wildElementalBoost).toFixed(0)}</p>
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