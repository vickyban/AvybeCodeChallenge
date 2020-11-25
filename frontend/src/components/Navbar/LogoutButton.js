import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from 'store/auth';

const LogoutButton = ({ children }) => {
	const dispatch = useDispatch();

	const onLogout = useCallback(() => {
		dispatch(logOut());
	}, [dispatch]);

	return React.cloneElement(children, { onClick: onLogout });
};

export default LogoutButton;
