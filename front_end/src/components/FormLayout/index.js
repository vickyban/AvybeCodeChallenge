import React from 'react';
import './index.css';

const FormLayout = ({ children, header, ImageComponent }) => {
	return (
		<div className="base-container">
			<div className="form-header">{header}</div>
			<div className="form-content">
				{ImageComponent ? (
					<ImageComponent />
				) : (
					<div className="form-content__img">
						<img
							src="https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png"
							alt="illustration"
						/>
					</div>
				)}
				<div className="form-content__form">{children}</div>
			</div>
		</div>
	);
};

export default FormLayout;
