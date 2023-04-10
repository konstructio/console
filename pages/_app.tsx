import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material';
import styled, { ThemeProvider } from 'styled-components';

import themeMUI from '../theme/muiTheme';
import theme from '../theme';
import { wrapper } from '../redux/store';
import '../styles/globals.css';
import Navigation from '../components/navigation';
import Row from '../components/Row/Row';
import Column from '../components/Column/Column';

const Layout = styled(Row)`
  background-color: ${({ theme }) => theme.colors.washMe};
  height: 100vh;
  width: 100vw;
`;

export const Header = styled(Row)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
  height: 46px;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(31, 41, 55, 0.06);
`;

export const Content = styled(Column)`
  padding-top: 46px;
  width: 100%;
`;

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <main id="app">
      <Head>
        <title>Kubefirst Console</title>
        <link rel="shortcut icon" href="/static/ray.svg" />
      </Head>
      <Provider store={store}>
        <ThemeProviderMUI theme={themeMUI}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Navigation />
              <Content>
                <Header />
                <Component {...props.pageProps} />
              </Content>
            </Layout>
          </ThemeProvider>
        </ThemeProviderMUI>
      </Provider>
    </main>
  );
}
