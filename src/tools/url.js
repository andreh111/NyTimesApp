import {Platform} from 'react-native';

export const getApiBaseUrl = () => {
  let baseUrl = '';

  if (Platform.OS === 'android') {
    baseUrl = 'http://10.0.2.2'; // Android emulator
  } else if (Platform.OS === 'ios') {
    baseUrl = 'http://localhost'; // iOS simulator
  }

  return baseUrl;
};
