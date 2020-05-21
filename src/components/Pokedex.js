import React, { useState, useCallback } from "react";

import { Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GalleryView from './GalleryView';
import TableView from './TableView';

const useStyles = makeStyles({
	card: {
		padding: '40px'
	},
	h2: {
		textAlign: 'left'
	},
	image: {
		marginBottom: 0
	},
	button: {
		width: '100%',
		maxWidth: '280px',
		height: '46px',
		margin: '0 auto'
	},
	pokemonCard: {
		padding: '20px',
		boxShadow: 'none',
		border: '1px solid black'
	}
});


const Pokedex = ({trainerData}) => {
	
	const classes = useStyles();

	const [isGalleryView, setIsGalleryView] = useState(false);
	const [pokemons, setPokemons] = useState([...trainerData.pokemons]);
 
	const toggleView = useCallback(() => {
		if (isGalleryView) {
			setIsGalleryView(false);
		} else {
			setIsGalleryView(true);
		}
	}, [isGalleryView]);

	return (

		<Card className={classes.card}>
			<h2 className={classes.h2}>Pokedex:</h2>
			<Button onClick={toggleView} type="submit" className={classes.button} variant="contained" color="primary">Toggle View</Button>

			{(() => {
				if (isGalleryView) {
					return (
						<GalleryView pokemons={pokemons} />
					)
				} else {
					return (
						<TableView pokemons={pokemons} setPokemons={setPokemons}></TableView>
					)
				}
			})()}
		</Card>
	);
};

export default Pokedex;


// ability to toggle views: list or gallery
// ability to sort and maybe filter?