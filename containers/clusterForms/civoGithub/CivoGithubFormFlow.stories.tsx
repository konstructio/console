import React, { useCallback, useState, useEffect } from 'react';
import { Story } from '@storybook/react';

import { useAppDispatch } from '../../../redux/store';
import { setInstallationStep } from '../../../redux/slices/installation.slice';
import { mockGithubUserOrganizations } from '../../../constants/mockGithubUserOrganizations';

import { CivoGithubFormFlow } from './CivoGithubFormFlow';

export default {
  title: 'Forms/CivoGithub/CivoGithubFormFlow',
  component: CivoGithubFormFlow,
};

const DefaultTemplate: Story = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedDomainValid, setHostedDomainValid] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [githubTokenValid, setGithubTokenValid] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setInstallationStep(1));
  }, [dispatch]);

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setHostedDomainValid(true);
      }, 5000);
    }
  }, [isValidating]);

  const handleGithubTokenBlur = useCallback((token: string) => {
    setGithubToken(token);
    setGithubTokenValid(true);
  }, []);

  const handleTestButtonClick = useCallback(() => {
    setShowMessage(true);
    setIsValidating(true);
  }, []);

  return (
    <CivoGithubFormFlow
      showMessage={showMessage}
      isValidating={isValidating}
      onTestButtonClick={handleTestButtonClick}
      isHostedDomainValid={hostedDomainValid}
      hasTokenValue={!!githubToken}
      githubTokenValid={githubTokenValid}
      githubUserOrginizations={mockGithubUserOrganizations}
      onGithubTokenBlur={handleGithubTokenBlur}
      loading={false}
    />
  );
};

export const Default = DefaultTemplate.bind({});
