import { createSlice } from '@reduxjs/toolkit';

import { AWS_GIT_STEPS } from '../../enums/installation';

type LocalInstallation = {
  githubToken: string;
  gitOpsBranch: string;
  templateRepoUrl: string;
};

type AWSGitInstallation = {
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
  awsGit?: AWSGitInstallation;
}

export const initialState: InstallationState = {
  local: undefined,
  awsGit: undefined,
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
    setAWSGitValues(state, { payload }) {
      const { step } = payload;

      if (step === AWS_GIT_STEPS.READINESS) {
        const { profile, hostedZoneName } = payload;

        state.awsGit = {
          step,
          profile,
          hostedZoneName,
          ...state.awsGit,
        };
      } else if (step === AWS_GIT_STEPS.SETUP) {
        state.awsGit = {
          ...payload,
          ...state.awsGit,
          step,
        };
      }
    },
  },
});

export const { setAWSGitValues, setLocalValues } = installationSlice.actions;

export default installationSlice.reducer;
