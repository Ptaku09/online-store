import { configureStore } from '@reduxjs/toolkit';
import { basketApi } from './basketApi';
import { createWrapper } from 'next-redux-wrapper';

export * from './basketApi';

export const store = () =>
  configureStore({
    reducer: {
      [basketApi.reducerPath]: basketApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(basketApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
