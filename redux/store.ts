import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { consoleApi } from './api';
// ToDo: we need to have just one api
// import { githubApi } from './api/github';
import configSlice from './slices/config.slice';
import installationSlice from './slices/installation.slice';
import githubSlice from './slices/github.slice';
import readinesSlice from './slices/readiness.slice';
import sessionSlice from './slices/session.slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [consoleApi.reducerPath]: consoleApi.reducer,
      config: configSlice,
      installation: installationSlice,
      github: githubSlice,
      readiness: readinesSlice,
      session: sessionSlice,
    },
    middleware: (gDM) => gDM().concat(consoleApi.middleware),
  });

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore);
