import React, { useCallback, useState, useEffect } from 'react';
import { Story } from '@storybook/react';

import { useAppDispatch } from '../../../redux/store';
import { setInstallationStep } from '../../../redux/slices/installation.slice';

import { CivoGitlabFormFlow } from './CivoGitlabFormFlow';

export default {
  title: 'Forms/CivoGitlab/CivoGitlabFormFlow',
  component: CivoGitlabFormFlow,
};

const DefaultTemplate: Story = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedDomainValid, setHostedDomainValid] = useState(false);

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

  const handleTestButtonClick = useCallback(() => {
    setShowMessage(true);
    setIsValidating(true);
  }, []);

  return (
    <CivoGitlabFormFlow
      showMessage={showMessage}
      isValidating={isValidating}
      onTestButtonClick={handleTestButtonClick}
      isHostedDomainValid={hostedDomainValid}
      loading={false}
    />
  );
};

export const Default = DefaultTemplate.bind({});
