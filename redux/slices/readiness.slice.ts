import { createSlice } from '@reduxjs/toolkit';

import { checkReadiness } from '../actions/readiness.action';

export interface ReadinessState {
  metaphorValidSites?: Array<string>;
}

export const initialState: ReadinessState = {
  metaphorValidSites: [],
};

const readiness = createSlice({
  name: 'readiness',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(checkReadiness.fulfilled, (state, action) => {
      const { success, url } = action.payload;

      if (success) {
        state.metaphorValidSites?.push(url);
      }
    });
  },
});

export default readiness.reducer;
