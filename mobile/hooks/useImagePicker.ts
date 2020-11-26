import { useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useDispatch } from 'react-redux';
import { updateUserAvatar } from '@store/users';

const pickImage = async () => {
	try {
		let { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0,
		});
		if (!cancelled) {
			const fileType = uri.substr(uri.lastIndexOf('.') + 1);
			const filename = uri.substr(uri.lastIndexOf('/') + 1);
			return {
				success: true,
				image: {
					uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
					type: `image/${fileType}`,
					name: filename,
				},
			};
		}
		return { success: false };
	} catch (E) {
		return { success: false };
	}
};

const checkPermission = async () => {
	const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	if (status === 'granted') {
		return true;
	} else {
		Alert.alert('Permission required', 'Please to app setting to enable');
		return false;
	}
};

const useImagePicker = (userId: string | number) => {
	const [uploading, setUploading] = useState(false);
	const dispatch = useDispatch();

	const pickPhoto = useCallback(async () => {
		const hasPermission = await checkPermission();
		if (hasPermission) {
			const result = await pickImage();
			if (result.success) {
				setUploading(true);
				dispatch(updateUserAvatar(userId, result.image))
					.catch((e) => {
						Alert.alert('Failed to upload image', 'Please try again later');
					})
					.finally(() => setUploading(false));
			}
		}
	}, [setUploading, dispatch]);

	return { pickPhoto, uploading };
};

export default useImagePicker;
