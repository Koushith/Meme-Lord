import { USER_ENDPOINT } from "@/utils";

import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { apiSlice } from "./apiSlice";

//TODO: fill this
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: USER_ENDPOINT,
        method: "POST",
        body: data,
      }),
    }),

    fetchProfileById: builder.query({
      query: (id) => ({
        url: `${USER_ENDPOINT}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useFetchProfileByIdQuery } = userApiSlice;
