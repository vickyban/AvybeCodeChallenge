import axios from 'axios';
import LocalStorageService from '../services/LocalStageService';

const client = axios.create({
	baseURL: `http://127.0.0.1:8000/`,
});

client.interceptors.request.use(
	(request) => {
		const token = LocalStorageService.getAccessToken();
		if (token) {
			request.headers['Authorization'] = `Token ${LocalStorageService.getAccessToken()}`;
		}
		return request;
	},
	(error) => {
		return Promise.rejest(error);
	}
);

export default client;
