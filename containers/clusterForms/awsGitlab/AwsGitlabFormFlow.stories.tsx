import React, { useCallback, useState, useEffect } from 'react';
import { Story } from '@storybook/react';

import { AwsGitlabFormFlow } from './AwsGitlabFormFlow';

export default {
  title: 'Forms/AwsGitlab/AwsGitlabFormFlow',
  component: AwsGitlabFormFlow,
};

const DefaultTemplate: Story = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedZoneValid, setHostedZoneValid] = useState(false);

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setHostedZoneValid(true);
      }, 5000);
    }
  }, [isValidating]);

  const handleTestButtonClick = useCallback(() => {
    setShowMessage(true);
    setIsValidating(true);
  }, []);

  return (
    <AwsGitlabFormFlow
      showMessage={showMessage}
      isValidating={isValidating}
      onTestButtonClick={handleTestButtonClick}
      isHostedZoneValid={hostedZoneValid}
    />
  );
};

export const Default = DefaultTemplate.bind({});
