import React, { ComponentProps } from 'react';
import { Text, TextInput as RNTextInput, StyleSheet } from 'react-native';
import { FieldRenderProps } from 'react-final-form';
import InputWrapper from './InputWrapper';

type TextInputProps = FieldRenderProps<string> & ComponentProps<typeof RNTextInput>;

const TextInput = ({ input: { onChange, value, ...input }, meta, label, ...rest }: TextInputProps) => {
	return (
		<InputWrapper error={!!(meta.touched && meta.error)}>
			<Text style={styles.label}>{label}</Text>
			<RNTextInput style={styles.input} defaultValue={value} onChangeText={onChange} {...input} {...rest} />
		</InputWrapper>
	);
};

export default TextInput;

const styles = StyleSheet.create({
	label: {
		fontWeight: 'bold',
		color: '#262730',
		textTransform: 'capitalize',
		marginBottom: 4,
	},
	input: {
		backgroundColor: 'rgb(240,240,240)',
		height: 50,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
});
