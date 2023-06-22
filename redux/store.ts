import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  // persistStore,
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { getPersistConfig } from 'redux-deep-persist';

import { consoleApi } from './api';
import {
  apiReducer,
  clusterReducer,
  configReducer,
  featureFlagsReducer,
  gitReducer,
  installationReducer,
  readinessReducer,
} from './slices';

const rootReducer = combineReducers({
  [consoleApi.reducerPath]: consoleApi.reducer,
  config: configReducer,
  installation: installationReducer,
  git: gitReducer,
  readiness: readinessReducer,
  api: apiReducer,
  featureFlags: featureFlagsReducer,
  cluster: clusterReducer,
});

const config = getPersistConfig({
  key: 'k1',
  storage,
  blacklist: [
    'installation.values.gitToken',
    'installation.values.aws_auth',
    'installation.values.civo_auth',
    'installation.values.do_auth',
    'installation.values.vultr_auth',
    'cluster',
    'api',
    'featureFlags',
    'git',
    'config',
    'internalApi',
    'readiness',
  ],
  rootReducer,
});

export const makeStore = () =>
  configureStore({
    devTools: process.env.NODE_ENV === 'development',
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(consoleApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore['getState']>;
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = makeStore() as AppStore;

export const wrapper = createWrapper<AppStore>(() => store);

// export const persistor = persistStore(store);
