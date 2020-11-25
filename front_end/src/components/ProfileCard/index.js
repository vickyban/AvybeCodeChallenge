import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../store/users';
import Avatar from '../Avatar';
import './index.css';

const ProfileCard = memo(({ userId }) => {
	const profile = useSelector(selectUserById(userId));
	return (
		<div className="profile profile--shadow">
			<div className="profile__avatar">
				<Avatar src={profile.avatar} />
			</div>
			<div>
				<h1 className="profile__nickname">{profile.nickname ?? profile.user.username}</h1>
				<p className="profile__username">@{profile.user.username}</p>
			</div>
		</div>
	);
});

export default ProfileCard;
