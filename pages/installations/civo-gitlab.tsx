import React, { useState, useEffect, useCallback } from 'react';

import { CivoGitlabFormFlow } from '../../containers/clusterForms/civoGitlab/CivoGitlabFormFlow';

export default function CivoGitlabInstallationPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedDomainValid, setHostedDomainValid] = useState(false);

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
}
