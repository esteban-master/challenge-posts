import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postsAPI } from "./posts";

export const store = configureStore({
  reducer: {
    [postsAPI.reducerPath]: postsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsAPI.middleware),
  devTools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);
