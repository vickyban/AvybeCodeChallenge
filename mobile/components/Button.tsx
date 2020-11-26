import React, { ComponentProps, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, StyleProp, TextStyle } from 'react-native';
import { debounce } from 'lodash';

type ButtonProps = ComponentProps<typeof TouchableOpacity> & {
	text: string;
	loading?: boolean;
	textStyle?: StyleProp<TextStyle>;
};
const Button = ({ text, onPress, loading = false, style, textStyle, ...buttonProps }: ButtonProps) => {
	const textOpacity = loading ? 0 : 1;

	const onPressWithDebounce = useCallback(
		debounce(() => onPress && onPress(), 300),
		[onPress]
	);
	return (
		<TouchableOpacity
			onPress={onPressWithDebounce}
			style={[styles.container, style]}
			disabled={loading}
			{...buttonProps}
		>
			<Text style={[styles.text, { opacity: textOpacity }, textStyle]}>{text}</Text>
			{loading && <ActivityIndicator size="small" color="#fff" style={styles.spinner} />}
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		height: undefined,
		minWidth: 160,
		paddingTop: 16,
		paddingBottom: 16,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#06f',
	},
	text: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
	},
	spinner: {
		position: 'absolute',
		height: 40,
		width: 40,
	},
});
