'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from '@/containers/header';
import Navigation from '@/containers/navigation';
import Row from '@/components/row';
import Column from '@/components/column';
import { useAppDispatch } from '@/redux/store';
import { getEnvVariables, getFlags } from '@/redux/thunks/config.thunk';
import { getClusters } from '@/redux/thunks/api.thunk';

const Container = styled(Row)`
  background-color: ${({ theme }) => theme.colors.washMe};
  height: 100vh;
  width: 100vw;
`;

export const Content = styled(Column)`
  width: 100%;
`;

export default function GetLayout({ children }: PropsWithChildren) {
  const [loadFlags, setLoadFlags] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loadFlags) {
      setLoadFlags(true);
      dispatch(getFlags());
      dispatch(getEnvVariables());
      dispatch(getClusters());
    }
  }, [dispatch, loadFlags]);

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
