import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserFormContainer from '../src/components/UserFormContainer';
import {login, register} from '../src/store/slices/auth.slice';

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

    fireEvent.changeText(getByTestId('email-input'), 'nilson@email.com');
    fireEvent.changeText(getByTestId('password-input'), 'nilson');
    fireEvent.press(getByText('Log In'));

    const actions = store.getActions();
    const expectedPayload = {email: 'nilson@email.com', password: 'nilson'};

    expect(actions[0].type).toEqual(login.pending.type);

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

    fireEvent.changeText(getByTestId('email-input'), 'andre@email.com');
    fireEvent.changeText(getByTestId('password-input'), 'andre123');
    fireEvent.press(getByText('Register'));

    const actions = store.getActions();
    const expectedPayload = {email: 'andre@email.com', password: 'andre123'};

    expect(actions[0].type).toEqual(register.pending.type);

    await store.dispatch(login(expectedPayload));
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
