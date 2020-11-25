import React, { useEffect } from 'react';
import './Home.css';
import ProfileCard from 'components/ProfileCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserList, selectAllUserIds } from 'store/users';

const Home = () => {
	const dispatch = useDispatch();
	const list = useSelector(selectAllUserIds);

	useEffect(() => {
		dispatch(loadUserList());
	}, [dispatch]);

	return (
		<div className="home">
			<h2 className="home__title">User List</h2>
			<div className="home__profilelist">
				{list.map((id) => (
					<ProfileCard key={id} userId={id} />
				))}
			</div>
		</div>
	);
};

export default Home;
