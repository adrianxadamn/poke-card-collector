import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Pokedex = () => (
  <Layout>
    <SEO title="Your Pokedex" />
    <h1>Your Pokedex</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Pokedex;
