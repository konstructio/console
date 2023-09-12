import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material';
import styled, { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';

import { muiTheme } from '../theme/muiTheme';
import { theme } from '../theme';
import Header from '../containers/header';
import Navigation from '../containers/navigation';
import Row from '../components/row';
import Column from '../components/column';
import { persistor, wrapper } from '../redux/store';
import { getClusters } from '../redux/thunks/api.thunk';
import { QueueProvider } from '../hooks/useQueue';
import '../styles/globals.css';

const Layout = styled(Row)`
  background-color: ${({ theme }) => theme.colors.washMe};
  height: 100vh;
  width: 100vw;
`;

export const Content = styled(Column)`
  width: 100%;
`;

export default function App({ Component, ...rest }: AppProps) {
  const [hasLoadedClusters, setHasLoadedClusters] = useState<boolean>(false);
  const { store, props } = wrapper.useWrappedStore(rest);
  const { push } = useRouter();

  useEffect(() => {
    if (!hasLoadedClusters) {
      store
        .dispatch(getClusters())
        .unwrap()
        .then(() => {
          if (process.env.NODE_ENV !== 'development') {
            push('/services');
          }
        })
        .catch(() => {
          push('/provision');
        });
      setHasLoadedClusters(true);
    }
  }, [hasLoadedClusters, push, store]);

  return (
    <main id="app">
      <Head>
        <title>Kubefirst Console</title>
        <link rel="shortcut icon" href="/static/ray.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProviderMUI theme={muiTheme}>
            <ThemeProvider theme={theme}>
              <QueueProvider>
                <Layout>
                  <Navigation />
                  <Content>
                    <Header />
                    <Component {...props.pageProps} />
                  </Content>
                </Layout>
              </QueueProvider>
            </ThemeProvider>
          </ThemeProviderMUI>
        </PersistGate>
      </Provider>
    </main>
  );
}
