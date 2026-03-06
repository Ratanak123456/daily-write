import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getDecryptedAccessToken,
  getDecryptedRefreshToken,
  storeAccessToken,
  storeRefreshToken,
  clearTokens,
} from "../util/tokenUtil";

// create customBaseQuery
const customBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (header) => {
    const accessToken = getDecryptedAccessToken();
    if (accessToken && !header.has("Authorization")) {
      header.set("Authorization", `Bearer ${accessToken}`);
    }
    return header;
  },
});

// Token refresh logic
let refreshPromise = null;

const tokenRefreshBaseQuery = async (args, api, extraOptions) => {
  // First, try the original request
  const result = await customBaseQuery(args, api, extraOptions);

  // If we get a 401, try to refresh the token
  if (result.error?.status === 401) {
    const refreshToken = getDecryptedRefreshToken();

    if (!refreshToken) {
      // No refresh token, need to logout
      clearTokens();
      window.location.href = "/auth";
      return result;
    }

    // Prevent multiple refresh calls at the same time
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const refreshResult = await customBaseQuery(
            {
              url: "/auth/refresh",
              method: "POST",
              body: { refreshToken },
              headers: {
                "Content-Type": "application/json",
                // Explicitly don't send the expired Authorization header
                Authorization: "",
              },
            },
            api,
            extraOptions,
          );

          const data = refreshResult.data?.data || refreshResult.data;

          if (data?.accessToken) {
            // Store new tokens
            storeAccessToken(data.accessToken);
            if (data.refreshToken) {
              storeRefreshToken(data.refreshToken);
            }
            return { success: true };
          } else {
            // Refresh failed, logout
            clearTokens();
            window.location.href = "/auth";
            return { success: false };
          }
        } catch {
          clearTokens();
          window.location.href = "/auth";
          return { success: false };
        } finally {
          refreshPromise = null;
        }
      })();
    }

    // Wait for refresh to complete
    const refreshResult = await refreshPromise;

    if (refreshResult.success) {
      // Retry the original request with new token
      return customBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Comment", "User", "Blog"],
  baseQuery: tokenRefreshBaseQuery,
  endpoints: () => ({}),
});
