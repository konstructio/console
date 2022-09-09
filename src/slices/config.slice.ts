import { createSlice } from '@reduxjs/toolkit';

import { Config } from '../types/config';
import { getConfigs } from '../actions/config.action';

export interface IConfigState {
  configs: Config;
}

export const initialState: IConfigState = {
  configs: {},
};

const configSlice = createSlice({
  name: 'configs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getConfigs.fulfilled, (state, action) => {
      state.configs = action.payload;
    });
  },
});

export default configSlice.reducer;
