import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from '../src/theme';
import { store } from '../src/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setupComponent<T>(Component: any, defaultProps?: T) {
  return async function (props?: Partial<T>) {
    return await render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Component {...(defaultProps as T)} {...(props as T)} />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>,
    );
  };
}

export default setupComponent;
