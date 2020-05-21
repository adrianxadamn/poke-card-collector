import React from "react";

import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	pokemonCard: {
		padding: '20px'
	}
});

const GalleryView = ({pokemons}) => {

	const classes = useStyles();

	return (
		<ul>
			{pokemons.map(pokemon => {
				return (
					<li key={pokemon.id}>
						<Card className={classes.pokemonCard}>
					  	<img className={classes.image} src={pokemon.image} alt={pokemon.name} />
					 		<h3>{pokemon.name}</h3>
						</Card>
					</li>
				)
			})}
		</ul>
	)
};

export default GalleryView;