import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './auth';
import users from './users';

const rootReducers = combineReducers({
	auth,
	users,
});

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({ reducer: persistedReducer });
let persistor = persistStore(store);

export default { store, persistor };
