import React from 'react';
import {View, StyleSheet} from 'react-native';

import UserFormContainer from '../components/UserFormContainer';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <UserFormContainer actionText="Register" mode="register" />
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
