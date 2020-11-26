import { createSlice } from '@reduxjs/toolkit';
import * as Api from '@api/users';
import { getTokenAsync, setTokenAsync, removeTokenAsync } from '@services/LocalStageService';
export * from './selectors';

const initialState = {
	userId: null,
	isLoggedIn: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loggedIn: (state, action) => {
			const { payload } = action;
			state.userId = payload.id;
			state.isLoggedIn = true;
		},
		loggedOut: (state) => {
			state.userId = null;
			state.isLoggedIn = false;
		},
	},
});

export const { loggedIn, loggedOut } = authSlice.actions;

export const register = (credentials) => async (dispatch) => {
	const { data } = await Api.registerUser(credentials);
	await setTokenAsync(data.token);
	const { data: profile } = await Api.fetchCurrentUser();

	dispatch(loggedIn(profile));
};

export const logIn = (credentials) => async (dispatch) => {
	const { data } = await Api.loginUser(credentials);
	await setTokenAsync(data.token);
	const { data: profile } = await Api.fetchCurrentUser();

	dispatch(loggedIn(profile));
};

export const rehydrate = () => async (dispatch) => {
	const token = await getTokenAsync();
	if (token) {
		const { data: profile } = await Api.fetchCurrentUser();
		dispatch(loggedIn(profile));
	}
};

export const logOut = () => async (dispatch) => {
	await Promise.all([removeTokenAsync()]);
	dispatch(loggedOut());
};
export default authSlice.reducer;
