import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
    await AsyncStorage.setItem('token', token);
}

export const getAndSetToken = async (tokenSetter) => {
    const token = await AsyncStorage.getItem('token');
    tokenSetter(token);
}