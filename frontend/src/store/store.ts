import { apiSlice } from "@/slices/apiSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // TODO: add providers
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
});
