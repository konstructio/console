import React, { PropsWithChildren } from 'react';

import { getEnvVars, getFeatureFlas, validateLicense } from '../lib/common';

import { Layout } from '@/containers/layout';

export default async function Page({ children }: PropsWithChildren) {
  const license = await validateLicense();
  const envVariables = await getEnvVars();
  const featureFlags = await getFeatureFlas();

  return (
    <Layout license={license} envVariables={envVariables} featureFlags={featureFlags}>
      {children}
    </Layout>
  );
}
