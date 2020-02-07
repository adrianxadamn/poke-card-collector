import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {

  const [captured, setCaptured] = useState([]);

  const data = useStaticQuery(graphql`
    query pokemon {
      site {
        siteMetadata {
          pokemon {
            name
            id
            image
          } 
        } 
      }
    }
  `);

  useEffect(() => {
    console.log('captured:', captured);
    console.log("oh shit");
  });

  const allPokemon = data.site.siteMetadata.pokemon;

  const capturePokemon = (pokemon) => {
    // return true or false
  };

  const encounterPokemon = () => {
    const allPokemonFound = [];
    let i = 0;
    let numOfEncounters = 7;

    // assigns number of possible encounters 
    if (captured.length + numOfEncounters >= allPokemon.length) {
      numOfEncounters = allPokemon.length - captured.length;
    }

    // find 7 pokemon
    while (i < numOfEncounters) {
      const getRandomIndex = Math.floor(Math.random() * allPokemon.length); 
      const thePokemon = allPokemon[getRandomIndex];
      const pokemonAlreadyFound = allPokemonFound.some(pokemon => pokemon.id === thePokemon.id);
      const pokemonAlreadyCaught = captured.some(pokemon => pokemon.id === thePokemon.id);
      // only add to array if pokemon hasn't been found and hasn't been caught
      if (!pokemonAlreadyFound && !pokemonAlreadyCaught) {
        allPokemonFound.push(thePokemon);
        i++;
      }
      console.log('loop');
    }



    console.log(allPokemonFound);

    //use filter array method to capture pokemon - pokemonCaught = allPokemonFound.filter()
    const pokemonCaught = [];
    setCaptured([...captured, ...allPokemonFound]);
  }; 

  return (
    <Layout>
      <SEO title="Home" />
      <button onClick={encounterPokemon}>Encounter Pokemon</button>
      <ul>
        {
          captured.map(pokemon => {
            return <li id={pokemon.id} key={pokemon.id}>
              <h3>{pokemon.name}</h3>
              <img src={pokemon.image} alt={pokemon.name} />
            </li>
          })
        }
      </ul>
    </Layout>
  );

};

export default IndexPage
