'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from '@/containers/header';
import Navigation from '@/containers/navigation';
import Row from '@/components/row';
import Column from '@/components/column';
import { useAppDispatch } from '@/redux/store';
import { getClusters } from '@/redux/thunks/api.thunk';
import { License } from '@/types/subscription';
import { setLicense } from '@/redux/slices/subscription.slice';
import { EnvironmentVariables, FeatureFlag } from '@/types/config';
import { setFlags } from '@/redux/slices/featureFlags.slice';
import { setConfigValues } from '@/redux/slices/config.slice';

const Container = styled(Row)`
  background-color: ${({ theme }) => theme.colors.washMe};
  height: 100vh;
  width: 100vw;
`;

export const Content = styled(Column)`
  overflow: auto;
  width: 100%;
`;

export interface LayoutProps extends PropsWithChildren {
  license: License;
  envVariables: EnvironmentVariables;
  featureFlags: Record<FeatureFlag, boolean>;
}

export function Layout({ children, envVariables, featureFlags, license }: LayoutProps) {
  const [loadFlags, setLoadFlags] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loadFlags) {
      setLoadFlags(true);
      dispatch(setFlags(featureFlags));
      dispatch(setConfigValues(envVariables));
      dispatch(setLicense(license));
      dispatch(getClusters());
    }
  }, [dispatch, envVariables, featureFlags, license, loadFlags]);

  return (
    <Container>
      <Navigation />
      <Content>
        <Header />
        {children}
      </Content>
    </Container>
  );
}
