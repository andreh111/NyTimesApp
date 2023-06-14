import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserFormContainer from '../src/components/UserFormContainer';
import {login, register} from '../src/store/slices/auth.slice';
import {act} from 'react-test-renderer';

const mockStore = configureStore([thunk]);

describe('UserFormContainer', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoading: false,
        error: null,
      },
    });
  });

  it('renders correctly', () => {
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <UserFormContainer mode="login" actionText="Log In" />
      </Provider>,
    );

    expect(getByText('Log in to your account')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByText('Log In')).toBeTruthy();
  });

  it('handles login action correctly', async () => {
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <UserFormContainer mode="login" actionText="Log In" />
      </Provider>,
    );
    await act(async () => {
      fireEvent.changeText(getByTestId('email-input'), 'nilson@email.com');
      fireEvent.changeText(getByTestId('password-input'), 'nilson');
      fireEvent.press(getByText('Log In'));
    });

    const expectedPayload = {email: 'nilson@email.com', password: 'nilson'};

    await store.dispatch(login(expectedPayload));
    const successAction = store
      .getActions()
      .find(action => action.type === login.fulfilled.type);
    if (successAction) {
      expect(successAction.payload.access_token).toBeDefined();
    } else {
      throw new Error('Fulfilled action not found');
    }
  });

  it('handles register action correctly', async () => {
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <UserFormContainer mode="register" actionText="Register" />
      </Provider>,
    );

    await act(async () => {
      fireEvent.changeText(getByTestId('email-input'), 'dani@email.com');
      fireEvent.changeText(getByTestId('password-input'), 'dani123');
      fireEvent.press(getByText('Register'));
    });

    const expectedPayload = {email: 'dani@email.com', password: 'dani123'};

    await store.dispatch(register(expectedPayload));
    const successAction = store
      .getActions()
      .find(action => action.type === register.fulfilled.type);
    if (successAction) {
      expect(successAction.payload.access_token).toBeDefined();
    } else {
      throw new Error('Fulfilled action not found');
    }
  });
});
