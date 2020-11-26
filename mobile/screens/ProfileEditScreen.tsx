import React, { useCallback } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUserId } from '@store/auth';
import FormErrors from '@components/FormErrors';
import TextInput from '@components/TextInput';
import FormValidators from '@services/FormValidators';
import SubmitButton from '@components/Button';
import { FORM_ERROR } from 'final-form';
import Button from '@components/Button';
import { selectUserById, updateUserNickname } from 'store/users';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Avatar, { IMAGE_SIZE } from '@components/Avatar';
import useImagePicker from '@hooks/useImagePicker';

const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

const ProfileScreen = () => {
	const insets = useSafeAreaInsets();
	const dispatch = useDispatch();
	const userId = useSelector(selectCurrentUserId);
	const profile = useSelector(selectUserById(userId));
	const { pickPhoto, uploading } = useImagePicker(userId);

	const onLogout = useCallback(() => {
		dispatch(logOut());
	}, []);

	const onSubmit = useCallback(
		(values) =>
			dispatch(updateUserNickname(userId, values.nickname)).catch(({ response, status }) => {
				if (status === 401) return onLogout();
				return {
					[FORM_ERROR]: response.data,
				};
			}),
		[]
	);

	return (
		<KeyboardAvoidingView style={styles.container} behavior={keyboardBehavior}>
			<ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
				<View style={[styles.avatarBox, { paddingTop: insets.top }]}>
					<TouchableOpacity onPress={pickPhoto} disabled={uploading}>
						<Avatar uri={profile?.avatar} style={styles.avatar} />
						{uploading && (
							<View style={styles.loaderBox}>
								<ActivityIndicator size="large" color="#06f" style={styles.loader} />
							</View>
						)}
					</TouchableOpacity>
				</View>
				<Form
					initialValues={profile}
					onSubmit={onSubmit}
					render={({ handleSubmit, submitting, submitError }) => (
						<View style={styles.form}>
							{submitError && <FormErrors errors={{ submitError }} />}
							<Field
								name="nickname"
								component={TextInput}
								placeholder={'nickname'}
								label={'Nickname'}
								validate={FormValidators.notBlank}
							/>
							<SubmitButton text="Save" onPress={handleSubmit} loading={submitting} />
						</View>
					)}
				/>
				<View style={styles.footer}>
					<Button
						text="Log out"
						style={styles.logoutBtn}
						textStyle={styles.logoutBtnText}
						onPress={onLogout}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	avatarBox: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#262730',
		paddingVertical: 16,
	},
	avatar: {
		borderWidth: 4,
		borderColor: 'white',
	},
	form: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 20,
		justifyContent: 'center',
	},
	footer: {
		marginVertical: 12,
	},
	logoutBtn: {
		textAlign: 'center',
		fontSize: 16,
		backgroundColor: 'transparent',
		borderTopWidth: 2,
		borderTopColor: '#e0e0e0',
		marginVertical: 12,
		marginHorizontal: 8,
	},
	logoutBtnText: {
		fontSize: 16,
		color: '#06f',
	},
	loaderBox: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.5)',
		borderRadius: IMAGE_SIZE / 2,
	},
	loader: {
		alignSelf: 'center',
	},
});
