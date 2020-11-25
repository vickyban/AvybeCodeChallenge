import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectIsLoggedIn } from 'store/auth/selectors';

const PrivateRoute = ({ children, ...rest }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isLoggedIn ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};
export default PrivateRoute;
