import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISessionState {
  email?: string;
  name?: string;
  id?: string;
}

export const initialState: ISessionState = {
  email: '',
  name: '',
  id: '',
};

const session = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<ISessionState>) {
      const {
        payload: { email, name, id },
      } = action;
      state.email = email;
      state.name = name;
      state.id = id;
    },
    revokeSession(state) {
      state.email = undefined;
      state.name = undefined;
      state.id = undefined;
    },
  },
});

export const { setUser, revokeSession } = session.actions;
export default session.reducer;
