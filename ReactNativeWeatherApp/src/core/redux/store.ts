import AppReducer from './reducers/appReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  FLUSH,
  PERSIST,
  REGISTER,
  PURGE,
  PAUSE,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  App: AppReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;