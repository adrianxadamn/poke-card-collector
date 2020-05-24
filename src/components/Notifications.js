import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby";
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

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
	      });
	      setNotifications(snapshotNotifications.reverse());
	    }
	  })

	  return () => {
	    if(unsubscribe){
	      unsubscribe();
	    }
	  }
	}, [firebase])

	return (
		<>
			<h2>Notifications</h2>
			{ firebase &&
				<ul className={classes.logs} ref={scrollBar}>
					{ notifications.length > 0 && 
						notifications.map((item, index) => {
							return <li className={classes.logItem} key={index}>
												<Link to={`/trainers/${item.user}`}>{item.user}</Link>
												{' '}
												{ReactHtmlParser(item.content)} - {moment(item.time.toDate()).fromNow()}
										 </li>
						})}
				</ul>
			}
		</>
	)
};

export default Notifications;