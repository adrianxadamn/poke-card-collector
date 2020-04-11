import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"

const Pokedex = () => (
  <section>
    <SEO title="Your Pokedex" />
    <h1>Your Pokedex</h1>
    <Link to="/">Go back to the homepage</Link>
  </section>
)

export default Pokedex;
