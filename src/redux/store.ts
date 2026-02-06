import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "./api/api";
import authSlice from "./features/auth/authSlice";
import aiChatAPI from "./features/aiChat/aiChatAPI";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    [aiChatAPI.reducerPath]: aiChatAPI.reducer,
    auth: authSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(aiChatAPI.middleware)
      .concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
