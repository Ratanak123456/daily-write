import { baseApi } from "../../baseApi";

export const auth = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      }),
    }),

    getCurrentUser: builder.query({
      query: () => {
        return {
          url: "/auth/me",
          method: "POST",
          body: {}, // Some APIs require a body for POST requests
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useUserLoginMutation, useGetCurrentUserQuery } = auth;
