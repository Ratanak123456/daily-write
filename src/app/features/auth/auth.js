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

    getCurrentUser: builder.query({
      query: () => {
        const accessToken = getDecryptedAccessToken();
        return {
          url: "/auth/me",
          method: "POST",
          body: {},
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useUserLoginMutation, useGetCurrentUserQuery } = auth;
