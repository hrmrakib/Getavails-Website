import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "./api/api";
import AuthenticationAPI from "./features/auth/authAPI";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthenticationAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
