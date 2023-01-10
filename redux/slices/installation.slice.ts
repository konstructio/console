import { createSlice } from '@reduxjs/toolkit';

type LocalInstallation = {
  githubToken: string;
  gitOpsBranch: string;
  templateRepoUrl: string;
};

export interface InstallationState {
  local?: LocalInstallation;
}

export const initialState: InstallationState = {
  local: undefined,
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
  },
});

export const { setLocalValues } = installationSlice.actions;

export default installationSlice.reducer;
