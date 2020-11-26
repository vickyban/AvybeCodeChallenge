import { combineReducers, configureStore } from '@reduxjs/toolkit';

import auth from './auth';
import users from './users';

const rootReducers = combineReducers({
	auth,
	users,
});

const store = configureStore({ reducer: rootReducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
