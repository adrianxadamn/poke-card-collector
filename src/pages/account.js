import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Account = () => (
  <Layout>
    <SEO title="Account" />
    <h1>Account</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Account;