import { getDecryptedAccessToken } from "../../../util/tokenUtil";
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

    userRegister: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: userData,
      }),
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "POST",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation, useGetCurrentUserQuery } = auth;
