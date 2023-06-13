import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import {topStoriesApi} from './slices/topStories.slice';
import {articleSearchApi} from './slices/articleSearch.slice';
import recentSearchesReducer from './slices/recentSearches.slice';
import authReducer from './slices/auth.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedSearchReducer = persistReducer(
  persistConfig,
  recentSearchesReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    searches: persistedSearchReducer,
    [topStoriesApi.reducerPath]: topStoriesApi.reducer,
    [articleSearchApi.reducerPath]: articleSearchApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(topStoriesApi.middleware, articleSearchApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
