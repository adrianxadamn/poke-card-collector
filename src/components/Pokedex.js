import React from "react";

import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	card: {
		padding: '40px'
	},
	h2: {
		textAlign: 'left'
	},
	image: {
		marginBottom: 0
	}
});


const Pokedex = ({trainerData}) => {
	
	const classes = useStyles();

	return (

		<Card className={classes.card}>
			<h2 className={classes.h2}>Pokedex:</h2>
	
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow hover>
							<TableCell>Avatar</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>ID</TableCell>
							<TableCell>Time Caught</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							trainerData.pokemons.map(pokemon => {
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
		</Card>

		// <div className="pokedex">
		//   <h2>Your Pokedex</h2>
		//   <ul>
		//     {
		//       userData.pokemons.map(pokemon => {
		//         return <li id={pokemon.id} key={pokemon.id}>
		//         	<Card className={classes.card}>
		// 	          <img className={classes.image} src={pokemon.image} alt={pokemon.name} />
		// 	          <h3>{pokemon.name}</h3>
		//         	</Card>
		//         </li>
		//       })
		//     }
		//   </ul>
		// </div>
	);
};

export default Pokedex;


// ability to toggle views: list or gallery
// ability to sort and maybe filter?