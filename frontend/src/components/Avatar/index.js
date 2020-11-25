import React from 'react';
import './index.css';

const mockUr = 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg';

const Avatar = ({ src }) => {
	return <img src={src ?? mockUr} alt="user's avatar" className="avatar avatar--shadow " />;
};

export default Avatar;
