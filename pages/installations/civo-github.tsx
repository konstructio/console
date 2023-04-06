import React, { useState, useEffect, useCallback } from 'react';

import { getUser, getUserOrganizations } from '../../redux/thunks/github.thunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { CivoGithubFormFlow } from '../../containers/clusterForms/civoGithub/CivoGithubFormFlow';

export default function CivoGithubInstallationPage() {
  const { user, organizations, isLoading } = useAppSelector(({ githubUser }) => githubUser);

  const dispatch = useAppDispatch();

  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedDomainValid, setHostedDomainValid] = useState(false);
  const [githubToken, setGithubToken] = useState('');

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setHostedDomainValid(true);
      }, 5000);
    }
  }, [isValidating]);

  const handleGithubTokenBlur = useCallback(
    async (token: string) => {
      setGithubToken(token);
      try {
        await dispatch(getUser(token)).unwrap();
        await dispatch(getUserOrganizations(token)).unwrap();
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
    <CivoGithubFormFlow
      showMessage={showMessage}
      isValidating={isValidating}
      onTestButtonClick={handleTestButtonClick}
      isHostedDomainValid={hostedDomainValid}
      hasTokenValue={!!githubToken}
      githubTokenValid={!!user}
      githubUserOrginizations={organizations}
      onGithubTokenBlur={handleGithubTokenBlur}
      loading={isLoading}
    />
  );
}
