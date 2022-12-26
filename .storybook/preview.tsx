import { ThemeProvider } from '@mui/material';
import React from 'react';
import { Provider } from 'react-redux';

import { makeStore } from '../redux/store';
import theme from '../theme/muiTheme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const store = makeStore();

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </Provider>
  ),
];
