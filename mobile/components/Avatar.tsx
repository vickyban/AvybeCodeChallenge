import React from 'react';
import { StyleSheet, Text, View, Image, StyleProp, ImageStyle } from 'react-native';

export const IMAGE_SIZE = 150;

type AvatarProps = {
	uri: string;
	style?: StyleProp<ImageStyle>;
};

const Avatar = ({ uri, style }: AvatarProps) => {
	return <Image source={{ uri }} style={[styles.img, style]} />;
};

export default Avatar;

const styles = StyleSheet.create({
	img: {
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
		borderRadius: IMAGE_SIZE / 2,
	},
});
