import React, { useState, useContext, useEffect, useRef } from "react"
import { Link } from "gatsby";
import { FirebaseContext } from '../components/Firebase';
import ReactHtmlParser from 'react-html-parser';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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

const months = [
	'Jan', 'Feb', 'Mar', 'Apr',	
	'May', 'Jun', 'Jul', 'Aug',	
	'Sep', 'Oct', 'Nov', 'Dec',	
];

const Notifications = () => {
	const classes = useStyles();
	const { firebase, loading } = useContext(FirebaseContext);
	const [notifications, setNotifications] = useState([]);
	const [users, setUsers] = useState([]);
	const scrollBar = useRef(null);

	useEffect(() => {
		if (scrollBar.current) {
			scrollBar.current.scrollTop = scrollBar.current.scrollHeight;
		}
	}, [notifications]);

	useEffect(() => {
		const getFirebaseNotifications = async () => {
			const notifications = await firebase.getNotifications();
			setNotifications(notifications);
		};
		if (firebase !== null) {
			getFirebaseNotifications();
		}
	}, [firebase]);

	return (
		<>
			<h2>Notifications</h2>
			{ !loading && firebase &&
				<ul className={classes.logs} ref={scrollBar}>
					{ notifications.length > 0 && 
						notifications.map((item, index) => {
							const date = new Date(item.time.seconds * 1000).getDate();
							const month = new Date(item.time.seconds * 1000).getMonth();
							const day = new Date(item.time.seconds * 1000).toDateString().slice(0, 3);
							const year = new Date(item.time.seconds * 1000).getFullYear();
							const time = `${day}, ${date} ${months[month]} ${year}`;
							return <li className={classes.logItem} key={index}>
												<Link to={`/trainers/${item.username}`}>{item.user}</Link>
												{' '}
												{ReactHtmlParser(item.content)} - {time}
										 </li>
						})}
				</ul>
			}
		</>
	)
};

export default Notifications;