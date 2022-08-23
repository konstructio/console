import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  name: string;
  lastName: string;
}

export const initialState: IUserState = {
  name: '',
  lastName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserState>) {
      const {
        payload: { name, lastName },
      } = action;
      state.name = name;
      state.lastName = lastName;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
