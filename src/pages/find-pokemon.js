import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import SEO from "../components/seo"

import { FirebaseContext } from '../components/Firebase';

import EncounteredPokemon from '../components/EncounteredPokemon';

const FindPokemon = () => {

	const { user, firebase, loading } = useContext(FirebaseContext);

	const [captured, setCaptured] = useState([]);
	
	return (

	  <section>
	    <SEO title="Find Pokemon" />
	    <h1>Find Pokemon</h1>

	    {(() => {
	    	if (!loading && firebase !== null) {
	    		if (user === null) {
	    			navigate('/login');
	    		}
	    		return (
				    <EncounteredPokemon captured={captured} setCaptured={setCaptured} />
	    		)
	    	}
	    })()}

	  </section>
	);

};
export default FindPokemon;


// show 1 pokemon at a time 
// has counter 
// shows logs if captured or fled
