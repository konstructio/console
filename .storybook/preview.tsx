import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { makeStore } from '../redux/store';
import { muiTheme } from '../theme/muiTheme';
import { theme } from '../theme';
import { setManagementCluster } from '../redux/slices/api.slice';
import { mapClusterFromRaw } from '../utils/mapClustersFromRaw';
import { mockClusterResponse } from '../tests/mocks/mockClusterResponse';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/',
    asPath: '/',
    query: {},
    push() {},
  },
  layout: 'fullscreen',
};

const store = makeStore();

const mockManagementCluster = mapClusterFromRaw(mockClusterResponse);

store.dispatch(setManagementCluster(mockManagementCluster));

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ThemeProviderMUI theme={muiTheme}>
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}
          >
            <Story />
          </div>
        </ThemeProviderMUI>
      </ThemeProvider>
    </Provider>
  ),
];
