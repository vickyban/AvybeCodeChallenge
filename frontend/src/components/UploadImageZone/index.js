import Avatar from 'components/Avatar';
import React, { useCallback, useEffect, useReducer } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { updateUserAvatar } from 'store/users';
import './index.css';

function dropZoneReducer(state, event) {
	switch (state.status) {
		case 'failure':
		case 'idle':
			switch (event.type) {
				case 'SELECT':
					return {
						...state,
						status: 'active',
						file: event.data,
						error: null,
					};
				default:
					return state;
			}
		case 'active':
			switch (event.type) {
				case 'SELECT':
					return {
						...state,
						status: 'active',
						file: event.data,
					};
				case 'UPLOAD':
					return {
						...state,
						status: 'uploading',
					};
				default:
					return state;
			}
		case 'uploading':
			switch (event.type) {
				case 'RESOLVE':
					return {
						...state,
						status: 'idle',
						file: null,
					};
				case 'REJECT':
					return {
						...state,
						status: 'failure',
						error: event.error,
					};
				default:
					return state;
			}
		default:
			return state;
	}
}

const initialState = {
	status: 'idle',
	file: null,
	error: null,
};

const UploadImageZone = ({ userId, initialImg }) => {
	const storeDispatch = useDispatch();
	const [state, dispatch] = useReducer(dropZoneReducer, initialState);
	const { file, status } = state;

	const onDrop = useCallback(
		(acceptedFiles) => {
			if (acceptedFiles.length === 0) return;

			const file = acceptedFiles[0];
			file.preview = URL.createObjectURL(file);
			dispatch({
				type: 'SELECT',
				data: file,
			});
		},
		[dispatch]
	);
	const { getRootProps, getInputProps } = useDropzone({ accept: 'image/*', onDrop });

	useEffect(
		() => () => {
			URL.revokeObjectURL(file?.preview);
		},
		[file]
	);

	useEffect(() => {
		if (status === 'uploading') {
			storeDispatch(updateUserAvatar(userId, file))
				.then(() => {
					dispatch({ type: 'RESOLVE' });
				})
				.catch((res) => {
					console.log(res);
					dispatch({ type: 'REJECT', error: res.data });
				});
		}
	}, [file, status, userId, storeDispatch]);

	return (
		<section className="img-dropzone">
			<div className="img-dropzone__preview">
				<Avatar src={file?.preview || initialImg} />
			</div>
			<div {...getRootProps({ className: 'img-dropzone__dropzone' })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop a image here, or click to select file</p>
			</div>
			<button
				className="btn img-dropzone__btn"
				onClick={() => dispatch({ type: 'UPLOAD' })}
				disabled={status !== 'active'}
			>
				{status === 'uploading' ? 'Uploading... ' : 'Upload'}
			</button>
		</section>
	);
};

export default UploadImageZone;
