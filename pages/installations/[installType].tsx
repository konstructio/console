import React, { FunctionComponent, useMemo } from 'react';

import { useAppSelector } from '../../redux/store';
import { GitProvider } from '../../types';
import { InstallationType } from '../../types/redux';
import { AwsGithubFormFlow } from '../../containers/clusterForms/awsGithub/awsGithubFormFlow/AwsGithubFormFlow';
import { CivoGithubFormFlow } from '../../containers/clusterForms/civoGithub/civoGithubFormFlow/CivoGithubFormFlow';
import { LocalFormFlow } from '../../containers/clusterForms/local/localFormFlow/LocalFormFlow';
import { AwsGitlabFormFlow } from '../../containers/clusterForms/awsGitlab/awsGitlabFormFlow/AwsGitlabFormFlow';

const INSTALLATION_MAP: Record<GitProvider, Record<InstallationType, FunctionComponent | null>> = {
  [GitProvider.GITHUB]: {
    [InstallationType.AWS]: AwsGithubFormFlow,
    [InstallationType.CIVO]: CivoGithubFormFlow,
    [InstallationType.DIGITAL_OCEAN]: null,
    [InstallationType.LOCAL]: LocalFormFlow,
    [InstallationType.VULTR]: null,
  },
  [GitProvider.GITLAB]: {
    [InstallationType.AWS]: AwsGitlabFormFlow,
    [InstallationType.CIVO]: null,
    [InstallationType.DIGITAL_OCEAN]: null,
    [InstallationType.LOCAL]: null,
    [InstallationType.VULTR]: null,
  },
};

export default function FormFlowRenderPage() {
  const { installType, gitProvider } = useAppSelector(({ installation }) => installation);

  const FormFlowComponent = useMemo(() => {
    if (gitProvider && installType) {
      return INSTALLATION_MAP[gitProvider][installType];
    }
    return null;
  }, [gitProvider, installType]);

  return FormFlowComponent ? <FormFlowComponent /> : <div>No gosh darn component there</div>;
}
