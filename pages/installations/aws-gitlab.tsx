import React, { useState, useEffect, useCallback } from 'react';

import { AwsGitlabFormFlow } from '../../containers/clusterForms/awsGitlab/AwsGitlabFormFlow';

export default function AwsGitlabInstallationPage() {
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
}
