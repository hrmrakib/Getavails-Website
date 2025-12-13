import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userToggle: false,
    user: null,
    token: null,
  },
  reducers: {
    userTrack: (state) => {
      state.userToggle = !state.userToggle;
    },

    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { userTrack, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
