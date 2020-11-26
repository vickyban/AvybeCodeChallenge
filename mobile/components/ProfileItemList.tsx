import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUserById } from 'store/users';
import Avatar from './Avatar';

type ProfileItemListProps = {
	userId: number | string;
};

const ProfileItemList = memo(({ userId }: ProfileItemListProps) => {
	const profile = useSelector(selectUserById(userId));
	return (
		<View style={styles.container}>
			<Avatar uri={profile.avatar} />
			<View style={styles.right}>
				<Text style={styles.nickname}>{profile.nickname}</Text>
				<Text>@{profile.user.username}</Text>
			</View>
		</View>
	);
});

export default ProfileItemList;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 200,
		backgroundColor: 'white',
		padding: 16,
		marginBottom: 16,
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	right: {
		flex: 1,
		marginLeft: 16,
	},
	nickname: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#262730',
	},
});
