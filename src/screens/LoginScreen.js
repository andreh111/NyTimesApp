import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Pressable} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';

import UserFormContainer from '../components/UserFormContainer';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <UserFormContainer actionText="Login" mode="login" />
      <Pressable onPress={handleRegister}>
        <Text style={styles.center}>Don't have an account ? Register</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  center: {
    textAlign: 'center',
  },
});

export default LoginScreen;
