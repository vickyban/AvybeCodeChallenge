import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';

import UserListScreen from '@screens/UserListScreen';
import ProfileEdit from '@screens/ProfileEditScreen';
import { BottomTabParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
	return (
		<BottomTab.Navigator initialRouteName="UserList" tabBarOptions={{ style: { height: 60 }, showLabel: false }}>
			<BottomTab.Screen
				name="UserList"
				component={UserListScreen}
				options={{
					tabBarIcon: ({ color }) => <AntDesign name="profile" size={24} color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Me"
				component={ProfileEdit}
				options={{
					tabBarIcon: ({ color }) => <AntDesign name="edit" size={24} color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}
