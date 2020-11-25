import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import ReduxStores from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
	<Provider store={ReduxStores.store}>
		<PersistGate loading={null} persistor={ReduxStores.persistor}>
			<Router>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</Router>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

reportWebVitals();
