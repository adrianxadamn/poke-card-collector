import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CreateAccount = () => (
  <Layout>
    <SEO title="Create Account" />
    <h1>Create Account</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default CreateAccount;


// show 1 pokemon at a time 
// has counter 
// shows logs if captured or fled
