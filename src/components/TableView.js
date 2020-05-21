import React, { useState, useCallback } from "react";

import { Table, TableBody, TableCell, TableSortLabel, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	pokemonCard: {
		padding: '20px'
	}
});

const TableView = ({pokemons, setPokemons}) => {
	
	const classes = useStyles();

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

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow hover>
						<TableCell>Avatar</TableCell>
						<TableCell>Name</TableCell>
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
								<TableRow id={pokemon.id} key={pokemon.id} hover>
									<TableCell><img className={classes.image} src={pokemon.image} alt={pokemon.name} /></TableCell>
									<TableCell>{pokemon.name}</TableCell>
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