// authSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {getApiBaseUrl} from '../../tools/url';

const loginURL = `${getApiBaseUrl()}:8000/auth/login`;
const registerURL = `${getApiBaseUrl()}:8000/auth/register`;

console.log(loginURL);

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}) => {
    const response = await axios.post(loginURL, {
      email,
      password,
    });
    return response.data;
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({email, password}) => {
    const response = await axios.post(registerURL, {
      email,
      password,
    });
    return response.data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      //login
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //register
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
