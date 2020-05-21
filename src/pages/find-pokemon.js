import React, { useState, useContext, useRef, useEffect } from "react"
import { navigate } from "gatsby"
import SEO from "../components/seo"
import ReactHtmlParser from 'react-html-parser';

import { Grid, Card } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { FirebaseContext } from '../components/Firebase';

import EncounteredPokemon from '../components/EncounteredPokemon';

const useStyles = makeStyles({
	card: {
		padding: '20px',
		marginBottom: '40px'
	},
	h2: {
		textAlign: 'left'
	},
	logs: {
		display: 'block',
		paddingLeft: '30px',
		listStyleType: 'circle',
		height: '400px',
		overflowX: 'scroll',
		border: '1px solid black'
	},
	logItem: {
		textAlign: 'left',
		width: '100%',
		padding: '10px 0'
	}
});

const FindPokemon = () => {

	const classes = useStyles();
	const { user, firebase, loading } = useContext(FirebaseContext);
	const [captured, setCaptured] = useState([]);
	const [logs, setLogs] = useState([]);
	const scrollBar = useRef(null);
	
	useEffect(() => {
		if (scrollBar.current) {
			scrollBar.current.scrollTop = scrollBar.current.scrollHeight;
		}
	}, [logs]);
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
	    			<Grid container spacing={3}>
	    				<Grid item xs={9}>
	    					<Card className={classes.card}>
				    			<EncounteredPokemon captured={captured} setCaptured={setCaptured} logs={logs} setLogs={setLogs} />
				    		</Card>
				    	</Grid>
				    	<Grid item xs={3}>
				    		<Card className={classes.card}>
				    			<h2 className={classes.h2}>Logs</h2>
				    			<ul className={classes.logs} ref={scrollBar}>
										{logs.map((log, index) => {
											return <li key={index} className={classes.logItem}>{ReactHtmlParser(log)}</li>
										})}
				    			</ul>
				    		</Card>
				    	</Grid>
				    </Grid>
	    		)
	    	}
	    })()}

	  </section>
	);

};
export default FindPokemon;
