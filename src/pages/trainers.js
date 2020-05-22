import React, { useContext, useState, useEffect } from "react";
import SEO from "../components/seo"

import { FirebaseContext } from '../components/Firebase';

import TrainerTable from '../components/TrainerTable';
import Pokedex from '../components/Pokedex';

const Trainer = (props) => {
	const { firebase, loading } = useContext(FirebaseContext);
	const [ranking, setRanking] = useState('');
	const [trainer, setTrainer] = useState(null);
	let username = props['*'];

	useEffect(() => {
		const getRankings = async () => {
			const index = await firebase.getRankings(username);
			setRanking(index);
		};
		const getUser = async () => {
			const trainer = await firebase.getUserDocByUsername({
				username: username
			});
			setTrainer(trainer);
		};
		if (firebase !== null) {
			getUser();
			getRankings();
		}
	}, [firebase, username]);

	return (
	  <section>
	    <SEO title={username} />
	    <h1>Trainer: {username}</h1>
	        {(() => {
	        	if (!loading && firebase !== null && trainer !== null) {
	        		return (
	        			<>
	        				<TrainerTable users={new Array(trainer)} ranking={ranking} />
	    	    			{trainer.pokemons.length > 0 ? <Pokedex trainerData={trainer} /> : ''}
	        			</>
	        		);
	        	}
	        })()}
	  </section>
	);
}

export default Trainer;
