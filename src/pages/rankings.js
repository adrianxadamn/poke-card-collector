import React, { useContext, useState, useEffect } from "react";
import SEO from "../components/seo"

import { FirebaseContext } from '../components/Firebase';

import TrainerTable from '../components/TrainerTable';

const Rankings = () => {

	const { firebase, loading } = useContext(FirebaseContext);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getAllUsers = async () => {
			const users = await firebase.getAllUsers('rank');
			setUsers(users);
		};
		if (firebase !== null) {
			getAllUsers();
		}
	}, [firebase]);

	return (
	  <section>
	    <SEO title="Rankings" />
	    <h1>Rankings</h1>
	    {(() => {
	    	if (!loading && firebase !== null) {
	    		return (
	    			<>
		    			<TrainerTable users={users} />
	    			</>
	    		);
	    	}
	    })()}

	  </section>
	)
};

export default Rankings;
