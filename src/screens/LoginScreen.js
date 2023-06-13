// LoginScreen.js

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Pressable} from '@react-native-material/core';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../store/slices/authSlice';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);

  const handleLogin = () => {
    dispatch(login({email, password}));
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in to your account</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        title="Log in"
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        loading={isLoading}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
      <Pressable onPress={handleRegister}>
        <Text>Don't have an account ? Register</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
  },
  input: {
    width: '80%',
    marginBottom: 16,
  },
  button: {
    width: '80%',
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default LoginScreen;
