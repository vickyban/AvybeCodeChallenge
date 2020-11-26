import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = '@access_token';

export const setTokenAsync = (access_token: string) => AsyncStorage.setItem(ACCESS_TOKEN_KEY, access_token);

export const getTokenAsync = () => AsyncStorage.getItem(ACCESS_TOKEN_KEY);

export const removeTokenAsync = () => AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
