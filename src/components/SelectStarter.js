import React, { useState, useContext, useEffect } from 'react';
import { navigate } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";
import { FirebaseContext } from '../components/Firebase';
import { Modal, Backdrop, Fade, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	modal: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	modalContainer: {
		width: '550px',
		backgroundColor: 'white',
		padding: '40px'
	},
	ul: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
	},
	li: {
		width: '50%'
	},
	paper: {
		cursor: 'pointer',
		padding: '40px 20px'
	},
	image: {
		marginBottom: 0
	}
});

const SelectStarter = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const { firebase, userData, setUserData } = useContext(FirebaseContext);
	const data = useStaticQuery(graphql`
	  query {
	    site {
	      siteMetadata {
	        pokemon {
	          name
	          id
	          image
	          encounter_rate
	          capture_rate
	        } 
	      } 
	    }
	  }
	`);
	const allPokemon = data.site.siteMetadata.pokemon;

	const selectPokemon = async (pokemon) => {
		let dateString = new Date().toUTCString();
		dateString = dateString.split(' ').slice(0, 4).join(' ');
		pokemon.date_caught = dateString;
		firebase.addCapturedPokemon(userData, setUserData, pokemon, true)
			.then((res) => {
				navigate('/account');
			});
	};

	useEffect(() => {
		if (userData !== null) {
			setOpen(true);
		}
	}, [userData]);

	return (
		<div>
		  <Modal
		    className={classes.modal}
		    open={open}
		    closeAfterTransition
		    BackdropComponent={Backdrop}
		    BackdropProps={{
		      timeout: 500,
		    }}
		  >
		    <Fade in={open}>
		      <div className={classes.modalContainer}>
		        <h2 id="transition-modal-title">Select your starter pokemon!</h2>
		        <ul className={classes.ul}>
		        	<li className={classes.li}>
		        		<button onClick={selectPokemon.bind(this, allPokemon[0])}> 
			        		<Paper className={classes.paper} elevation={3}>
	        			  	<img className={classes.image} src={allPokemon[0].image} alt={allPokemon[0].name} />
	        			 		<h3>{allPokemon[0].name}</h3>
			        		</Paper>
		        		</button>
		        	</li>
		        	<li className={classes.li}>
		        		<button onClick={selectPokemon.bind(this, allPokemon[3])}> 
			        		<Paper className={classes.paper} elevation={3}>
	        			  	<img className={classes.image} src={allPokemon[3].image} alt={allPokemon[3].name} />
	        			 		<h3>{allPokemon[3].name}</h3>
			        		</Paper>
		        		</button>
		        	</li>
		        	<li className={classes.li}>
		        		<button onClick={selectPokemon.bind(this, allPokemon[6])}> 
			        		<Paper className={classes.paper} elevation={3}>
	        			  	<img className={classes.image} src={allPokemon[6].image} alt={allPokemon[6].name} />
	        			 		<h3>{allPokemon[6].name}</h3>
			        		</Paper>
		        		</button>
		        	</li>
		        	<li className={classes.li}>
		        		<button onClick={selectPokemon.bind(this, allPokemon[24])}> 
			        		<Paper className={classes.paper} elevation={3}>
	        			  	<img className={classes.image} src={allPokemon[24].image} alt={allPokemon[24].name} />
	        			 		<h3>{allPokemon[24].name}</h3>
			        		</Paper>
		        		</button>
		        	</li>
		        </ul>
		      </div>
		    </Fade>
		  </Modal>
		</div>
	);
};

export default SelectStarter;