import React from 'react';
import { Link } from "gatsby";
import moment from 'moment';

import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	card: {
		padding: '40px',
		marginBottom: '40px'
	},
	h2: {
		textAlign: 'left'
	},
	button: {
		width: '100%',
		maxWidth: '280px',
		height: '46px',
		margin: '0 auto'
	},
	divider: {
		margin: '20px 0'
	},
	goldColor: {
		color: '#CFB53B',
		fontWeight: '700'
	},
	silverColor: {
		color: '#C0C0C0',
		fontWeight: '700'
	},
	bronzeColor: {
		color: '#8C7853',
		fontWeight: '700'
	}
});

const TrainerTable = ({users, ranking}) => {

	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<TableContainer>
				<Table >
					<TableHead>
						<TableRow hover>
							<TableCell>Rank</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Pokedex</TableCell>
							<TableCell>Completion</TableCell>
							<TableCell>Elapsed Time</TableCell>
							<TableCell>Date Joined</TableCell>
							<TableCell>Date Completed</TableCell>
							<TableCell>Last Login</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							users.map((user, index) => {
								const daysOld = moment().diff(user.creation_time, 'days');
								const completionTime = (user.completion_time ? moment(user.completion_time).format('MM/DD/YYYY') : 'N/A');
								let colorClass = ''; 
								let userRanking = index + 1;
								if (users.length === 1) {
									userRanking = ranking;
								} 
								if (userRanking === 1) {
									colorClass = classes.goldColor;
								} else if (userRanking === 2) {
									colorClass = classes.silverColor;
								} else if (userRanking === 3) { 
									colorClass = classes.bronzeColor;
								}
								return (
	  							<TableRow hover key={user.user_id}>
	    							<TableCell className={colorClass}>{userRanking}</TableCell>
	    							<TableCell>
	    								<Link className={colorClass} to={`/trainers/${user.username}`}>
	    									{user.username}
	    								</Link>
	    							</TableCell>
	    							{user.pokemons.length > 0 ? 
	    								<TableCell>{user.pokemons.length}/151</TableCell>
	    								:
	    								<TableCell>0/151</TableCell>
	    							}
	    							{user.pokemons.length > 0 ? 
	    								<TableCell>{((user.pokemons.length / 151) * 100).toFixed(2)}%</TableCell>
	    								: 
	    								<TableCell>0%</TableCell>
	    							}
	    							<TableCell>{daysOld} Day{daysOld === 1 ? '' : 's'}</TableCell>
	    							<TableCell>{moment(user.creation_time).format('MM/DD/YYYY')}</TableCell>
	    							<TableCell>{completionTime}</TableCell>
	    							<TableCell>{moment(user.last_login).format('MM/DD/YYYY')}</TableCell>
								</TableRow>
								)
							})
						}
					</TableBody>
				</Table>
			</TableContainer>
		</Card>

	);
};

export default TrainerTable;