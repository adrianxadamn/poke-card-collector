import React, { useState, useEffect } from "react";

import Layout from "../components/layout"
import SEO from "../components/seo"
import axios from 'axios';

const IndexPage = () => {

  const [cool, setPokemon] = useState([]);

  const numOfPokemon = 151;
  let pokemonIds = [];

  for (let i = 1; i <= numOfPokemon; i++) {
    pokemonIds.push(i);
  }

  const fetchPokemon = async () => {
    const pokemons = pokemonIds.map(id => {
      return axios.get(`http://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.data);
    });

    Promise.all(pokemons).then((res) => {
      setPokemon(res);
    });
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {
          cool.map((pokemon, index) => {
            return <li id={index} key={index}>
              <h3>{pokemon.name}</h3>
              <ul className="types">
                <li>
                  {pokemon.types[0].type.name}
                </li>
              </ul>
              <img src={pokemon.sprites.front_default} alt={pokemon.title} />
            </li>
          })
        }
      </ul>
    </Layout>
  );

};

export default IndexPage
