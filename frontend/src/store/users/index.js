import { createSlice } from '@reduxjs/toolkit';
import { loggedIn, loggedOut } from '../auth';
import * as Api from '../../api/users';
import { userListSchema } from './schema';
import { normalize } from 'normalizr';
export * from './selectors';

const initialState = {
	byId: {},
	allIds: [],
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		loadedList: {
			reducer: (state, action) => {
				const { payload } = action;
				state.allIds = payload.allIds;
				state.byId = { ...state.byId, ...payload.byId };
			},
			prepare: (byId, allIds) => ({ payload: { byId, allIds } }),
		},
		updatedUser: (state, action) => {
			const { payload } = action;
			state.byId[payload.id] = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loggedIn, (state, action) => {
				const user = action.payload;
				state.byId[user.id] = user;
			})
			.addCase(loggedOut, (state) => {
				state.byId = {};
				state.allIds = [];
			});
	},
});

export const { loadedList, updatedUser } = usersSlice.actions;

export const loadUserList = () => async (dispatch) => {
	const { data } = await Api.fetchUserList();
	const { result, entities } = normalize(data, userListSchema);
	dispatch(loadedList(entities.users, result));
};

export const updateUserNickname = (useId, nickname) => async (dispatch) => {
	const { data } = await Api.updateUserNickname(useId, nickname);

	dispatch(updatedUser(data));
};

export const updateUserAvatar = (useId, imgfile) => async (dispatch) => {
	const { data } = await Api.uploadUserAvatar(useId, imgfile);
	dispatch(updatedUser(data));
};

export default usersSlice.reducer;
