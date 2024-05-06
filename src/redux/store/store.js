import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

import allUser from '../slices/userSlice';

const rootReducer = combineReducers({
  allUser: allUser,
});

const persistConfig = {
  key: 'root', // key for the localStorage object
  storage, // storage engine to use
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
