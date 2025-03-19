import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: '',
  loading: false,
  error: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    },
    logOut: (state) => {
      state.user = null;
      state.loading = false;
      state.error = false;
    }
  }
});

export const {
  signInStart,
  signInSuccess,
  logOut
} = userSlice.actions;

export default userSlice.reducer;