import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserList, selectAllUserIds } from '@store/users';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListItem from '@components/ProfileItemList';

const keyExtractor = (id: string | number) => `profile-${id}`;
export default function UserListScreen() {
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();
	const profileList = useSelector(selectAllUserIds);

	const loadList = useCallback(() => {
		dispatch(loadUserList()).catch((e) => console.error(e));
	}, []);

	useEffect(() => {
		loadList();
	}, []);

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<FlatList
				data={profileList}
				keyExtractor={keyExtractor}
				// onRefresh={loadList}
				contentContainerStyle={styles.listContainer}
				renderItem={({ item }) => <ListItem userId={item} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContainer: {
		flexGrow: 1,
		padding: 12,
	},
});
