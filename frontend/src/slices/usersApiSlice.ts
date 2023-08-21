import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { apiSlice } from "./apiSlice";

//TODO: fill this
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "", //TODO: Fill this,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApiSlice;
