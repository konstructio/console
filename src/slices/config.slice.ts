import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Config } from '../types/config';

export interface IConfigState {
  configs: Config;
}

export const initialState: IConfigState = {
  configs: {} as Config,
};

const configSlice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    setConfigs(state, action: PayloadAction<Config>) {
      state.configs = action.payload;
    },
  },
});

export const { setConfigs } = configSlice.actions;

export default configSlice.reducer;
