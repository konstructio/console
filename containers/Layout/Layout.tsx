'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';

import KubefirstContent from '../KubefirstContent/KubefirstContent';

import { Container, Content } from './Layout.styled';

import Header from '@/containers/Header/Header';
import Navigation from '@/containers/Navigation/Navigation';
import { useAppDispatch } from '@/redux/store';
import { EnvironmentVariables, FeatureFlag } from '@/types/config';
import { setFlags } from '@/redux/slices/featureFlags.slice';
import { setConfigValues } from '@/redux/slices/config.slice';
import FlappyKray from '@/components/FlappyKRay/FlappyKRay';
import useModal from '@/hooks/useModal';

export interface LayoutProps extends PropsWithChildren {
  envVariables: EnvironmentVariables;
  featureFlags: Record<FeatureFlag, boolean>;
}

export function Layout({ children, envVariables, featureFlags }: LayoutProps) {
  const [loadFlags, setLoadFlags] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    setLoadFlags(true);
    dispatch(setFlags(featureFlags));
    dispatch(setConfigValues(envVariables));
  }, [dispatch, envVariables, featureFlags, loadFlags]);

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
