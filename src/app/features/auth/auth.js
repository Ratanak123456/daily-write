import { baseApi } from "../../baseApi";
import { auth as firebaseAuth } from "../../firebase/firebaseConfig";
import {
  getDecryptedAccessToken,
  isFirebaseAuthSession,
} from "../../../utils/tokenUtil";

const decodeJwtPayload = (token) => {
  try {
    const payload = token?.split(".")?.[1];
    if (!payload) return null;
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
};

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
      queryFn: async (_arg, _api, _extraOptions, baseQuery) => {
        if (isFirebaseAuthSession()) {
          const user = firebaseAuth.currentUser;
          if (user) {
            const firebaseProfileUrl =
              user.photoURL ||
              user.providerData?.[0]?.photoURL ||
              user.reloadUserInfo?.photoUrl ||
              null;

            return {
              data: {
                data: {
                  uuid: user.uid,
                  fullName:
                    user.displayName || user.email?.split("@")[0] || "Firebase User",
                  email: user.email || "",
                  profileUrl: firebaseProfileUrl,
                  coverUrl: "",
                  bio: "",
                  createdAt: user.metadata?.creationTime || "",
                },
              },
            };
          }

          const accessToken = getDecryptedAccessToken();
          const jwtData = decodeJwtPayload(accessToken);
          if (jwtData) {
            return {
              data: {
                data: {
                  uuid: jwtData.user_id || jwtData.sub || "",
                  fullName:
                    jwtData.name || jwtData.email?.split("@")[0] || "Firebase User",
                  email: jwtData.email || "",
                  profileUrl: jwtData.picture || null,
                  coverUrl: "",
                  bio: "",
                  createdAt: "",
                },
              },
            };
          }
        }

        return baseQuery({
          url: "/auth/me",
          method: "POST",
        });
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation, useGetCurrentUserQuery } = auth;
