import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: false,
  },
  reducers: {
    userTrack: (state) => {
      state.user = !state.user;
    },
  },
});

export const { userTrack } = authSlice.actions;
export default authSlice.reducer;
