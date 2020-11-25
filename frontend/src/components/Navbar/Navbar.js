import React, { useCallback, useState } from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import LogoutButton from './LogoutButton';
import { selectIsLoggedIn } from 'store/auth/selectors';

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const toggle = useCallback(() => setOpen((v) => !v), [setOpen]);
	return (
		<nav className="navbar">
			<Link to="/" className="navbar__logo">
				<img src="logo192.png" alt="react logo" />
			</Link>
			<div className="menu-icon" onClick={toggle}>
				{open ? <CloseIcon fontSize="inherit" /> : <MenuIcon fontSize="inherit" />}
			</div>
			<ul className={open ? 'nav__menu active ' : 'nav__menu'}>
				{isLoggedIn ? (
					<>
						<li>
							<Link to="/me" className="nav__link">
								My Profile
							</Link>
						</li>
						<li>
							<LogoutButton>
								<Link to="/logout" className="nav__link">
									Sign Out
								</Link>
							</LogoutButton>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/login" className="nav__link">
								Sign In
							</Link>
						</li>
						<li>
							<Link to="/register" className="nav__link nav__link--register">
								Sign Up
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
