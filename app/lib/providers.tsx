'use client';

import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';

import { NotificationsProvider } from '@/context/Notification.context';
import { QueueProvider } from '@/hooks/useQueue';
import { ThemeProvider } from '@/lib/styled-components';
import { persistor, store } from '@/redux/store';
import { muiTheme } from '@/theme/muiTheme';
import { theme } from '@/theme/index';

export function Providers({ children, session }: PropsWithChildren<{ session: Session | null }>) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProviderMUI theme={muiTheme}>
            <ThemeProvider theme={theme}>
              <QueueProvider>
                <NotificationsProvider>{children}</NotificationsProvider>
              </QueueProvider>
            </ThemeProvider>
          </ThemeProviderMUI>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
