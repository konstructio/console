import React, { PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';

import { Providers } from '@/lib/providers';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import StyledComponentsRegistry from '@/lib/registry';

import '../styles/globals.css';

export const metadata = {
  title: 'Kubefirst Console',
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
  },
  icons: {
    shortcut: '/static/ray.svg',
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession<typeof authOptions, Session>(authOptions);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers session={session}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
