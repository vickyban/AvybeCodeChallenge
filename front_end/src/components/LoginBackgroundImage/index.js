import React from 'react';
import './index.css';

const LoginBackgroundImage = () => {
	return (
		<div style={{ position: 'absolute' }}>
			<div class="login_bg">
				<img
					className="login_bg_img"
					src="https://images.unsplash.com/photo-1525362081669-2b476bb628c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
					alt="login background"
				/>
				<svg
					width={400}
					height={400}
					viewBox="0 0 1920 1080"
					xmlns="http://www.w3.org/2000/svg"
					stroke="null"
					vectorEffect="non-scaling-stroke"
				>
					<defs>
						<clipPath id="loginSvg">
							<path
								transform="translate(-350 -100)"
								d="M1246.615 993.803c-106.441-95.882-202.973-337.868 49.678-537.585 252.652-199.717 64.884-256.55 233.737-386.969 168.853-130.418 387.726-2.286 387.726-2.286s54.24 748.751 2.241 901.023c-52 152.272-566.94 121.7-673.382 25.817z"
								fillOpacity="null"
								strokeOpacity="null"
								strokeWidth={1.5}
							/>
						</clipPath>
					</defs>
				</svg>
			</div>
		</div>
	);
};

export default LoginBackgroundImage;
