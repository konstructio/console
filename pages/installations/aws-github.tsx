import React, { useState, useEffect, useCallback } from 'react';

import { getGithubUser, getGithubUserOrganizations } from '../../redux/thunks/git.thunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { AwsGithubFormFlow } from '../../containers/clusterForms/awsGithub/AwsGithubFormFlow';

export default function AwsGithubInstallationPage() {
  const { githubUser, githubUserOrganizations, isLoading } = useAppSelector(({ git }) => git);

  const dispatch = useAppDispatch();

  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedZoneValid, setHostedZoneValid] = useState(false);
  const [githubToken, setGithubToken] = useState('');

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setHostedZoneValid(true);
      }, 5000);
    }
  }, [isValidating]);

  const handleGithubTokenBlur = useCallback(
    async (token: string) => {
      setGithubToken(token);
      try {
        await dispatch(getGithubUser(token)).unwrap();
        await dispatch(getGithubUserOrganizations(token)).unwrap();
      } catch (error) {
        // error processed in redux state
      }
    },
    [dispatch],
  );

  const handleTestButtonClick = useCallback(() => {
    setShowMessage(true);
    setIsValidating(true);
  }, []);

  return (
    <AwsGithubFormFlow
      showMessage={showMessage}
      isValidating={isValidating}
      onTestButtonClick={handleTestButtonClick}
      isHostedZoneValid={hostedZoneValid}
      hasTokenValue={!!githubToken}
      githubTokenValid={!!githubUser}
      githubUserOrginizations={githubUserOrganizations}
      onGithubTokenBlur={handleGithubTokenBlur}
      loading={isLoading}
    />
  );
}
