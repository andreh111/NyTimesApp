import React, {useState} from 'react';
import {Button, Text, TextInput} from '@react-native-material/core';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login, register} from '../store/slices/auth.slice';

const UserFormContainer = ({mode, actionText}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);

  const handleAction = () => {
    dispatch(
      mode === 'login' ? login({email, password}) : register({email, password}),
    );
  };

  const pageTitle =
    mode === 'login' ? 'Log in to your account' : 'Register a new account';

  return (
    <View style={[styles.container, styles.spacing]}>
      <Text style={styles.title}>{pageTitle}</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.spacing}
        testID="email-input"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.spacing}
        testID="password-input"
      />
      <Button
        title={actionText}
        mode="contained"
        onPress={handleAction}
        style={styles.button}
        loading={isLoading}
      />
      {error && (
        <Text style={[styles.error, styles.spacing]}>{error.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center'},
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  spacing: {
    marginBottom: 16,
  },
  error: {
    color: 'red',
  },
});

export default UserFormContainer;
