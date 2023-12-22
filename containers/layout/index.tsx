'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';

import KubefirstContent from '../kubefirstContent';

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
import FlappyKray from '@/components/flappyKray';
import useModal from '@/hooks/useModal';

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
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isModalContentOpen,
    openModal: openModalContent,
    closeModal: closeModalContent,
  } = useModal();

  const handleOpenFlappy = () => {
    openModal();
  };

  const handleOpenKubefirstModal = () => {
    openModalContent();
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoadFlags(true);
    dispatch(setFlags(featureFlags));
    dispatch(setConfigValues(envVariables));
    dispatch(setLicense(license));
    dispatch(getClusters());
  }, [dispatch, envVariables, featureFlags, license, loadFlags]);

  return (
    <Container>
      <Navigation
        handleOpenFlappy={handleOpenFlappy}
        handleOpenKubefirstModal={handleOpenKubefirstModal}
      />
      <Content>
        <Header
          handleOpenFlappy={handleOpenFlappy}
          handleOpenKubefirstModal={handleOpenKubefirstModal}
        />
        {children}
      </Content>

      {isOpen && <FlappyKray isOpen closeModal={closeModal} />}
      {isModalContentOpen && (
        <KubefirstContent isOpen={isModalContentOpen} closeModal={closeModalContent} />
      )}
    </Container>
  );
}
