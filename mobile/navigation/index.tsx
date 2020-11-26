import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import LoginScreen from '@screens/LoginScreen';
import SignupScreen from '@screens/SignupScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '@store/auth';

export default function Navigation() {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	);
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{!isLoggedIn ? (
				<>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Signup" component={SignupScreen} />
				</>
			) : (
				<Stack.Screen name="Main" component={BottomTabNavigator} />
			)}
		</Stack.Navigator>
	);
}
