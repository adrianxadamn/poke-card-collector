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
    
    const pokemonFound = [];
    let i = 1;
    // find 7 pokemon
    while (i <= 7) {
      const getRandomIndex = Math.floor(Math.random() * allPokemon.length); 
      pokemonFound.push(allPokemon[getRandomIndex]);
      i++;
    }
    console.log(pokemonFound);

    //use filter array method to capture pokemon - pokemonCaught = pokemonFound.filter()
    const pokemonCaught = [];
    setCaptured(pokemonCaught);
  }; 

  return (
    <Layout>
      <SEO title="Home" />
      <button onClick={encounterPokemon}>Encounter Pokemon</button>
      <ul>
        {
          allPokemon.map(pokemon => {
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
