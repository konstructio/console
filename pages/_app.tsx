import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DM_Sans } from '@next/font/google';
import styled, { ThemeProvider } from 'styled-components';
import '../styles/globals.css';

import Sidebar from '../components/sidebar';
import Footer from '../containers/footer';
import theme from '../theme';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.bleachedSilk};
  display: flex;
  height: 100%;
`;

const sans = DM_Sans({
  weight: ['400', '700'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={sans.className} id="app">
      <Head>
        <title>Kubefirst Console</title>
        <link rel="shortcut icon" href="/static/k-ray.svg" />
      </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          <Sidebar onSidebarItemClick={() => console.info('click')} />
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </ThemeProvider>
    </main>
  );
}
