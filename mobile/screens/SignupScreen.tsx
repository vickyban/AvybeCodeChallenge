import React, { useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import FormLayout from '@components/FormLayout';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { register } from '@store/auth';
import FormErrors from '@components/FormErrors';
import TextInput from '@components/TextInput';
import FormValidators from '@services/FormValidators';
import SubmitButton from '@components/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FORM_ERROR } from 'final-form';

const SignUpScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const onSubmit = useCallback((values) => {
		dispatch(register(values)).catch((res) => {
			return {
				[FORM_ERROR]: res.data,
			};
		});
	}, []);

	const navigateToRegister = useCallback((values) => {
		navigation.navigate('Login');
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<FormLayout title="Sign up">
				<>
					<Form
						onSubmit={onSubmit}
						render={({ handleSubmit, submitting, submitError, errors }) => (
							<View style={styles.form}>
								{submitError && <FormErrors errors={{ submitError }} />}
								<Field
									name="username"
									component={TextInput}
									placeholder={'Username'}
									label={'Username'}
									validate={FormValidators.notBlank}
								/>
								<Field
									name="password"
									component={TextInput}
									placeholder={'password'}
									label={'Password'}
									validate={FormValidators.notBlank}
									secureTextEntry
								/>
								<Field
									name="password2"
									component={TextInput}
									placeholder={'Confirm Password'}
									label={'Confirm Password'}
									validate={FormValidators.notBlank}
									secureTextEntry
								/>
								<SubmitButton text="Register" onPress={handleSubmit} loading={submitting} />
							</View>
						)}
					/>
					<TouchableOpacity onPress={navigateToRegister} style={styles.link}>
						<Text style={styles.linkText}>I am already a member</Text>
					</TouchableOpacity>
				</>
			</FormLayout>
		</SafeAreaView>
	);
};

export default SignUpScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	form: {
		flex: 1,
		paddingHorizontal: 8,
		justifyContent: 'flex-end',
	},
	link: {
		padding: 8,
		marginVertical: 12,
	},
	linkText: {
		textAlign: 'center',
		fontSize: 16,
		color: '#06f',
	},
});
