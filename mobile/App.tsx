import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import RehydrateProvider from './components/Rehydrate';

export default function App() {
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<Provider store={store}>
				<RehydrateProvider>
					<Navigation />
					<StatusBar />
				</RehydrateProvider>
			</Provider>
		);
	}
}
