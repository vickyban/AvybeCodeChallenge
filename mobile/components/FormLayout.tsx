import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

const illustration = require('@assets/images/login.png');

type FormLayoutProps = {
	children: React.ReactNode;
	title: string;
};

const FormLayout = ({ children, title }: FormLayoutProps) => {
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardBehavior}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.container}>
					<Text style={styles.header}>{title}</Text>
					<Image source={illustration} style={styles.illustration} resizeMode="contain" />
					<View style={styles.content}>{children}</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default FormLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 18,
		paddingHorizontal: 20,
		backgroundColor: 'white',
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#262730',
	},
	illustration: {
		width: '80%',
		height: 200,
		alignSelf: 'center',
	},
	content: {
		flex: 1,
	},
});
