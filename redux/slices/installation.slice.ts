import { createSlice } from '@reduxjs/toolkit';

import { AWS_GITHUB_STEPS } from '../../enums/installation';

type LocalInstallation = {
  githubToken: string;
  gitOpsBranch: string;
  templateRepoUrl: string;
};

type AWSGitHubInstallation = {
  step: number;
  profile?: string;
  hostedZoneName?: string;
  adminEmail?: string;
  kbotPassword?: string;
  region?: string;
  clusterName?: string;
  bucketName?: string;
  githubToken?: string;
  githubOrganization?: string;
  awsNodesSpot?: boolean;
};

export interface InstallationState {
  local?: LocalInstallation;
  awsGitHub?: AWSGitHubInstallation;
}

export const initialState: InstallationState = {
  local: undefined,
  awsGitHub: undefined,
};

const installationSlice = createSlice({
  name: 'installation',
  initialState,
  reducers: {
    setLocalValues(state, { payload }) {
      const { githubToken, gitOpsBranch, templateRepoUrl } = payload;
      state.local = {
        githubToken: githubToken,
        gitOpsBranch: gitOpsBranch,
        templateRepoUrl: templateRepoUrl,
      };
    },
    setAWSGitHubValues(state, { payload }) {
      const { step } = payload;

      if (step === AWS_GITHUB_STEPS.READINESS) {
        const { profile, hostedZoneName } = payload;

        state.awsGitHub = {
          step,
          profile,
          hostedZoneName,
          ...state.awsGitHub,
        };
      } else if (step === AWS_GITHUB_STEPS.SETUP) {
        state.awsGitHub = {
          ...payload,
          ...state.awsGitHub,
          step,
        };
      }
    },
  },
});

export const { setAWSGitHubValues, setLocalValues } = installationSlice.actions;

export default installationSlice.reducer;
