import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  LocalInstallValues,
  InstallationType,
  CivoGithubClusterValues,
  AwsGithubClusterValues,
  AwsClusterValues,
  CivoClusterValues,
} from '../../types/redux';

export interface InstallationState {
  local?: LocalInstallValues;
  awsGithub?: AwsGithubClusterValues;
  awsGitlab?: AwsClusterValues;
  civoGithub?: CivoGithubClusterValues;
  civoGitlab?: CivoClusterValues;
  installType: InstallationType;
  installationStep: number;
}

export const initialState: InstallationState = {
  installType: InstallationType.LOCAL,
  installationStep: 0,
};

const installationSlice = createSlice({
  name: 'installation',
  initialState,
  reducers: {
    setInstallationStep: (state, action: PayloadAction<number>) => {
      state.installationStep = action.payload;
    },
    setLocalInstallState: (state, action: PayloadAction<LocalInstallValues>) => {
      state.local = {
        ...state.local,
        ...action.payload,
      };
    },
    setAWSGithubInstallState: (state, action: PayloadAction<AwsGithubClusterValues>) => {
      state.awsGithub = {
        ...state.awsGithub,
        ...action.payload,
      };
    },
    setAWSGitlabInstallState: (state, action: PayloadAction<AwsClusterValues>) => {
      state.awsGitlab = {
        ...state.awsGitlab,
        ...action.payload,
      };
    },
    setCivoGithubInstallState: (state, action: PayloadAction<CivoGithubClusterValues>) => {
      state.civoGithub = {
        ...state.civoGithub,
        ...action.payload,
      };
    },
    setCivoGitlabInstallState: (state, action: PayloadAction<CivoClusterValues>) => {
      state.civoGitlab = {
        ...state.civoGitlab,
        ...action.payload,
      };
    },
    setInstallType: (state, action: PayloadAction<InstallationType>) => {
      state.installType = action.payload;
    },
  },
});

export const {
  setInstallationStep,
  setLocalInstallState,
  setAWSGithubInstallState,
  setAWSGitlabInstallState,
  setCivoGithubInstallState,
  setCivoGitlabInstallState,
  setInstallType,
} = installationSlice.actions;

export const installationReducer = installationSlice.reducer;
