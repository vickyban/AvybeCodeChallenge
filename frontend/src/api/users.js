import api from './apiClient';

export const fetchUserList = () => api.get('api/users/');

export const fetchUserById = (userId) => api.get(`api/users/${userId}/`);

export const fetchCurrentUser = () => api.get('api/users/me/');

export const updateUserNickname = (userId, value) => {
	const formData = new FormData();
	formData.append('nickname', value);

	return api.put(`api/users/${userId}/`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

export const uploadUserAvatar = (userId, imgFile) => {
	const formData = new FormData();
	formData.append('avatar', imgFile);

	return api.put(`api/users/${userId}/`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

export const registerUser = (data) => api.post('api/users/register/', data);

export const loginUser = (data) => api.post('api/users/login/', data);

export const logoutUser = () => api.post('api/users/logout/');
