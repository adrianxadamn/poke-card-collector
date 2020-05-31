import React, { useState, useCallback, useContext } from "react";
import { Table, TableBody, TableCell, TableSortLabel, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { FirebaseContext } from '../components/Firebase';

const useStyles = makeStyles({
	pokemonCard: {
		padding: '20px'
	},
	image: {
		marginBottom: 0
	},
	isActive: {
		borderTop: '2px solid black',
		borderBottom: '2px solid black'
	},
	tableRow: {
		cursor: 'pointer'
	}
});

const TableView = ({trainerData, setUserData, pokemons, setPokemons}) => {
	
	const classes = useStyles();
	const { firebase } = useContext(FirebaseContext);
	const [order, setOrder] = useState('asc');

	// if you want to sort by more than one option, 
	// you'll need to make functional components
	// reference: material-ui sorting tables
	const sortBy = useCallback(() => {
		const sortedPokemons = pokemons.sort((a, b) => {
			if (order === 'asc') {
				return b.id - a.id
			} else {
				return a.id - b.id
			}
		});	

		if (order === 'asc') {
			setOrder('desc');
		} else {
			setOrder('asc');
		}

		setPokemons([...sortedPokemons]);
	}, [order, pokemons, setPokemons]);

	const selectPokemon = (pokemon) => {
		firebase.selectActivePokemon(trainerData, setUserData, pokemon);
	};

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow hover>
						<TableCell>Avatar</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>CP</TableCell>
						<TableCell>Types</TableCell>
						<TableCell>
							<TableSortLabel 
								direction={order} 
								onClick={sortBy}
								>
									ID
								</TableSortLabel>
						</TableCell>
						<TableCell>Time Caught</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ 
						pokemons.map(pokemon => {
							return (
								<TableRow onClick={selectPokemon.bind(this, pokemon)} className={classNames((pokemon.active_pokemon ? classes.isActive : ''), classes.tableRow)} id={pokemon.id} key={pokemon.id} hover>
									<TableCell><img className={classes.image} src={pokemon.image} alt={pokemon.name} /></TableCell>
									<TableCell>{pokemon.name}</TableCell>
									<TableCell>{pokemon.combat_power}</TableCell>
									<TableCell>{pokemon.types.map((type, index) => {
			            	return <span className={`element element--${type}`} key={index}>{type}</span>
			            })}</TableCell>
									<TableCell>#{pokemon.id}</TableCell>
									<TableCell>{pokemon.date_caught}</TableCell>
								</TableRow>
							)
						})
					}
				</TableBody>
			</Table>
		</TableContainer>
	)
};

export default TableView;