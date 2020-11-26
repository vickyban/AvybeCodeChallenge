import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type FormErrors = {
	errors: Record<string, string>;
};
const FormErrors = ({ errors }: FormErrors) => {
	return (
		<View style={styles.container}>
			{Object.values(errors).map((value) => (
				<Text key={value} style={styles.error}>
					{value}
				</Text>
			))}
		</View>
	);
};

export default FormErrors;

const styles = StyleSheet.create({
	container: {
		marginVertical: 12,
	},
	error: {
		color: '#d33f49',
	},
});
