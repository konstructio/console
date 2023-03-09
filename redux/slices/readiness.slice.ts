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
  reducers: {
    setMetaphorValidSite(state, { payload }) {
      state.metaphorValidSites?.push(payload.url);
    },
  },
  extraReducers(builder) {
    builder.addCase(checkReadiness.fulfilled, (state, action) => {
      if (action.payload?.url) {
        const { success, url } = action.payload;

        if (success) {
          state.metaphorValidSites?.push(url);
        }
      }
    });
  },
});

export const { setMetaphorValidSite } = readiness.actions;

export default readiness.reducer;
