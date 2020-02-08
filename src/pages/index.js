import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import './index.css';

const IndexPage = () => {

  const [captured, setCaptured] = useState([]);
  const [encountered, setEncountered] = useState([]);

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
          } 
        } 
      }
    }
  `);

  useEffect(() => {
    console.log('captured:', captured);
  });

  const allPokemon = data.site.siteMetadata.pokemon;

  const capturePokemon = (id) => {
    const currPokemon = allPokemon.find(pokemon => pokemon.id === id);
    const getRandomCapturePerc = Math.floor(Math.random() * 100);
    const caught = (getRandomCapturePerc + currPokemon.capture_rate >= 100) ? true : false;
    if (caught) {
      setCaptured([...captured, currPokemon]);
      console.log(`You caught, ${currPokemon.name}!`);
    } else {
      console.log(`Could not capture, ${currPokemon.name}`);
    }
    const pokemonLeft = encountered.filter(pokemon => pokemon.id !== currPokemon.id);
    setEncountered(pokemonLeft);
  };

  const findPokemon = () => {
    const allEncounteredPokemon = [];
    let i = 0;
    let numOfEncounters = 7;
    // assigns number of possible encounters 
    if (captured.length + numOfEncounters >= allPokemon.length) {
      numOfEncounters = allPokemon.length - captured.length;
    }
    // find 7 pokemon
    while (i < numOfEncounters) {
      const getRandomIndex = Math.floor(Math.random() * allPokemon.length); 
      const getRandomEncounterPerc = Math.floor(Math.random() * 100); 
      const currPokemon = allPokemon[getRandomIndex];
      if (getRandomEncounterPerc + currPokemon.encounter_rate < 100) {
        console.log(currPokemon.name, 'flees from you');
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

  return (
    <Layout>
      <SEO title="Home" />
      <button onClick={findPokemon}>Encounter Pokemon</button>

      <div className="encountered">
        <h2>You've encountered these Pokemon!</h2>
        <ul className="encountered-pokemon">
          {
            encountered.map(pokemon => {
              return <li onClick={capturePokemon.bind(this, pokemon.id)} id={pokemon.id} key={pokemon.id}>
                <button> 
                  <h3>{pokemon.name}</h3>
                  <img src={pokemon.image} alt={pokemon.name} />
                  <div>Capture!</div>
                </button>
              </li>
            })
          }
        </ul>
      </div>

      <div className="pokedex">
        <h2>Your Pokedex</h2>
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
      </div>
    </Layout>
  );

};

export default IndexPage
