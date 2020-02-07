import React from "react";
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query pokemon {
      site {
        pokemon {
          name
          id
          image
        }  
      }
    }
  `)

  console.log(data.site.pokemon);

  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {
          data.site.pokemon.map(pokemon => {
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
