import React, { useState } from "react";

import Layout from "../components/layout"
import SEO from "../components/seo"
import './index.css';

import EncounteredPokemon from '../components/EncounteredPokemon';
import Pokedex from '../components/Pokedex';

const IndexPage = () => {

  const [captured, setCaptured] = useState([]);

  return (
    <Layout>
      <SEO title="Home" />
      <EncounteredPokemon captured={captured} setCaptured={setCaptured} />
      <Pokedex captured={captured} />

    </Layout>
  );

};

export default IndexPage
