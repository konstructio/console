import React, { PropsWithChildren } from 'react';

import { Providers } from '@/app/lib/providers';
import StyledComponentsRegistry from '@/app/lib/registry';
import { Layout } from '@/containers/Layout/Layout';
import { getEnvVars, getFeatureFlags } from '@/app/lib/common';
import '../styles/globals.css';

export const metadata = {
  title: 'Kubefirst Console',
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
  },
  icons: {
    shortcut: 'https://assets.kubefirst.com/console/ray.svg',
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const envVariables = await getEnvVars();
  const featureFlags = await getFeatureFlags();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <StyledComponentsRegistry>
            <Layout envVariables={envVariables} featureFlags={featureFlags}>
              {children}
            </Layout>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
