import React from 'react';
import Avatar from './Avatar';
import UploadImageModal from './UploadImageModal';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	avatarWrapper: {
		position: 'relative',
	},
	addBtn: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		borderRadius: theme.spacing(3),
		backgroundColor: theme.palette.primary.main,
	},
}));

const EditableAvatar = ({ src, userId }) => {
	const classes = useStyles();
	return (
		<div className={classes.avatarWrapper}>
			<Avatar src={src} />
			<div className={classes.addBtn}>
				<UploadImageModal userId={userId} initialImg={src}>
					{(openModal) => (
						<IconButton
							aria-label="upload picture"
							component="span"
							size="small"
							style={{ color: 'white' }}
							onClick={openModal}
						>
							<PhotoCamera />
						</IconButton>
					)}
				</UploadImageModal>
			</div>
		</div>
	);
};

export default EditableAvatar;
