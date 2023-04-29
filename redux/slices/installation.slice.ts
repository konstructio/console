import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InstallationType, InstallValues } from '../../types/redux';
import { GitProvider } from '../../types';

export interface InstallationState {
  values?: InstallValues;
  gitProvider?: GitProvider;
  installType?: InstallationType;
  installationStep: number;
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
  },
});

export const { setInstallationStep, setInstallValues, setInstallType, setGitProvider } =
  installationSlice.actions;

export const installationReducer = installationSlice.reducer;
