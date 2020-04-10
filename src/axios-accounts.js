import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://pokemon-collector-7d65c.firebaseio.com/'
});

export default instance;