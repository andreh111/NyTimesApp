import React from 'react';
import {Button, Text, TextInput} from '@react-native-material/core';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';

import {login, register} from '../store/slices/auth.slice';
import {userValidationSchema} from '../validation/userValidationSchema';

const UserFormContainer = ({mode, actionText}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);

  const handleAction = values => {
    dispatch(
      mode === 'login'
        ? login({email: values.email, password: values.password})
        : register({email: values.email, password: values.password}),
    );
  };

  const pageTitle =
    mode === 'login' ? 'Log in to your account' : 'Register a new account';

  return (
    <View style={[styles.container, styles.spacing]}>
      <Text style={styles.title}>{pageTitle}</Text>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={userValidationSchema}
        onSubmit={handleAction}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              style={styles.spacing}
              testID="email-input"
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              style={styles.spacing}
              testID="password-input"
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <Button
              title={actionText}
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              loading={isLoading}
            />
          </>
        )}
      </Formik>
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
