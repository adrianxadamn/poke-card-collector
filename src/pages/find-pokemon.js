import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"

const FindPokemon = () => (
  <section>
    <SEO title="Find Pokemon" />
    <h1>Find Pokemon</h1>
    <Link to="/">Go back to the homepage</Link>
  </section>
)

export default FindPokemon;


// show 1 pokemon at a time 
// has counter 
// shows logs if captured or fled
