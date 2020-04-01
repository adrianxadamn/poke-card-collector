import React from "react";

const Pokedex = ({ captured }) => {
	return (
		<div className="pokedex">
		  <h2>Your Pokedex</h2>
		  <ul>
		    {
		      captured.map(pokemon => {
		        return <li id={pokemon.id} key={pokemon.id}>
		          <img src={pokemon.image} alt={pokemon.name} />
		          <h3>{pokemon.name}</h3>
		        </li>
		      })
		    }
		  </ul>
		</div>
	);
};

export default Pokedex;