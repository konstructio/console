import React, { useCallback, useState, useEffect } from 'react';
import { Story } from '@storybook/react';

import { mockGithubUserOrganizations } from '../../../constants/mockGithubUserOrganizations';
import { useAppDispatch } from '../../../redux/store';
import { setInstallationStep } from '../../../redux/slices/installation.slice';

import { AwsGithubFormFlow } from './AwsGithubFormFlow';

export default {
  title: 'Forms/AwsGithub/AwsGithubFormFlow',
  component: AwsGithubFormFlow,
};

const DefaultTemplate: Story = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedZoneValid, setHostedZoneValid] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [githubTokenValid, setGithubTokenValid] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setHostedZoneValid(true);
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

  useEffect(() => {
    // advance to first step to simulate selection
    dispatch(setInstallationStep(1));
  }, [dispatch]);

  return (
    <AwsGithubFormFlow
      showMessage={showMessage}
      isValidating={isValidating}
      onTestButtonClick={handleTestButtonClick}
      isHostedZoneValid={hostedZoneValid}
      hasTokenValue={!!githubToken}
      githubTokenValid={githubTokenValid}
      githubUserOrginizations={mockGithubUserOrganizations}
      onGithubTokenBlur={handleGithubTokenBlur}
      loading={false}
    />
  );
};

export const Default = DefaultTemplate.bind({});
