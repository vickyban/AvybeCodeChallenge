import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, Text } from 'react-native';

type InputWrapperProps = {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
	error?: boolean;
};
const InputWrapper = ({ children, style, error }: InputWrapperProps) => (
	<View style={[styles.container, style]}>
		<View style={[styles.errorIcon, { opacity: error ? 1 : 0 }]} testID="starIcon">
			<Text style={styles.iconText} allowFontScaling={false}>
				*
			</Text>
		</View>
		{children}
	</View>
);

export default InputWrapper;

export const BORDER_RADII = 28;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginBottom: 20,
	},
	errorIcon: {
		position: 'absolute',
		marginLeft: -16,
	},
	iconText: {
		color: '#d33f49',
		fontWeight: 'bold',
		fontSize: 20,
	},
});
