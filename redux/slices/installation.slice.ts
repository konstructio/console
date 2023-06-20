import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InstallationType, InstallValues } from '../../types/redux';
import { GitProvider } from '../../types';

export interface InstallationState {
  values?: InstallValues;
  gitProvider?: GitProvider;
  installType?: InstallationType;
  installationStep: number;
  error?: string;
  errorDetails?: string;
}
export const initialState: InstallationState = {
  installationStep: 0,
};

const installationSlice = createSlice({
  name: 'installation',
  initialState,
  reducers: {
    setInstallationStep: (state, action: PayloadAction<number>) => {
      state.installationStep = action.payload;
    },
    setInstallValues: (state, action: PayloadAction<InstallValues>) => {
      state.values = { ...state.values, ...action.payload };
    },
    setInstallType: (state, action: PayloadAction<InstallationType>) => {
      state.installType = action.payload;
    },
    setGitProvider: (state, action: PayloadAction<GitProvider>) => {
      state.gitProvider = action.payload;
    },
    resetInstallState: (state) => {
      state.installationStep = 0;
      state.gitProvider = undefined;
      state.installType = undefined;
      state.values = undefined;
      state.error = undefined;
      state.errorDetails = undefined;
    },
    setError: (state, action: PayloadAction<{ error?: string; errorDetails?: string }>) => {
      const { error, errorDetails } = action.payload;
      state.error = error;
      state.errorDetails = errorDetails;
    },
    clearError: (state) => {
      state.error = undefined;
      state.errorDetails = undefined;
    },
  },
});

export const {
  clearError,
  setInstallationStep,
  setInstallValues,
  setInstallType,
  setGitProvider,
  resetInstallState,
  setError,
} = installationSlice.actions;

export const installationReducer = installationSlice.reducer;
