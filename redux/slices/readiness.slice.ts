import { createSlice } from '@reduxjs/toolkit';

import { checkReadiness } from '../actions/readiness.action';

export interface ReadinessState {
  availableSites: Array<string>;
}

export const initialState: ReadinessState = {
  availableSites: [],
};

const readiness = createSlice({
  name: 'readiness',
  initialState,
  reducers: {
    setAvailableSite(state, { payload }) {
      state.availableSites?.push(payload.url);
    },
  },
  extraReducers(builder) {
    builder.addCase(checkReadiness.fulfilled, (state, action) => {
      if (action.payload?.url) {
        const { success, url } = action.payload;

        if (success) {
          state.availableSites?.push(url);
        }
      }
    });
  },
});

export const { setAvailableSite } = readiness.actions;

export default readiness.reducer;
