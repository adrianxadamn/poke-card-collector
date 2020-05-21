import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby";
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

const Notifications = ({firebase}) => {
	const classes = useStyles();
	const [notifications, setNotifications] = useState([]);
	const scrollBar = useRef(null);

	useEffect(() => {
		if (scrollBar.current) {
			scrollBar.current.scrollTop = scrollBar.current.scrollHeight;
		}
	}, [notifications]);

	useEffect(() => {
	  const unsubscribe = firebase.subscribeToNotifications({
	    onSnapshot: (snapshot) => {
	      console.log(snapshot);
	      const snapshotNotifications = [];
	      snapshot.forEach(doc => {
	        snapshotNotifications.push({
	          id: doc.id,
	          ...doc.data()
	        })
	      })
	      setNotifications(snapshotNotifications);
	    }
	  })

	  return () => {
	    if(unsubscribe){
	      unsubscribe();
	    }
	  }
	}, [])

	return (
		<>
			<h2>Notifications</h2>
			{ firebase &&
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