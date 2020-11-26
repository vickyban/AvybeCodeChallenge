import axios from 'axios';
import { getTokenAsync } from '@services/LocalStageService';
import Constants from 'expo-constants';

const client = axios.create({
	baseURL: `${Constants.manifest.extra.API_HOSTNAME}:8000/`,
});

client.interceptors.request.use(
	async (request) => {
		const token = await getTokenAsync();
		if (token) {
			request.headers['Authorization'] = `Token ${token}`;
		}
		return request;
	},
	(error) => {
		return Promise.rejest(error);
	}
);

export default client;
