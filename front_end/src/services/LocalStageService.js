class LocalStorageService {
	setToken(access_token) {
		localStorage.setItem('access_token', access_token);
	}
	getAccessToken() {
		return localStorage.getItem('access_token');
	}
	clearToken() {
		localStorage.removeItem('access_token');
	}
}

const localStorageService = new LocalStorageService();
export default localStorageService;
