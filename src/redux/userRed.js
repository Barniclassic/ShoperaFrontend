import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { currentUser: null, isFetching: false, error: false },
  reducers: {
    loginProcess: (state) => {
      state.isFetching = true;
    },
    loginSuccessful: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    logout: (state) => {
      state.currentUser = null;
    },

    signupProcess: (state) => {
      state.isFetching = true;
    },
    signupSuccessful: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    signupFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginProcess, loginSuccessful, loginFailed,  logout, signupProcess, signupSuccessful, signupFailed} = userSlice.actions;
export default userSlice.reducer;
