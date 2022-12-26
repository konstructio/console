import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Roboto } from '@next/font/google';
import { ThemeProvider } from '@mui/material';
import styled from 'styled-components';

import Sidebar from '../components/sidebar';
import Footer from '../containers/footer';
import theme from '../theme/muiTheme';
import { wrapper } from '../redux/store';
import '../styles/globals.css';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.bleachedSilk};
  display: flex;
  height: 100%;
`;

const roboto = Roboto({
  weight: ['400', '500', '700'],
  display: 'block',
});

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <main className={roboto.className} id="app">
      <Head>
        <title>Kubefirst Console</title>
        <link rel="shortcut icon" href="/static/k-ray.svg" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Sidebar onSidebarItemClick={() => console.info('click')} />
            <Component {...props.pageProps} />
          </Layout>
          <Footer />
        </ThemeProvider>
      </Provider>
    </main>
  );
}
