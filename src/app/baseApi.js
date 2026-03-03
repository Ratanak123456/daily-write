import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDecryptedAccessToken, getDecryptedRefreshToken, storeAccessToken, clearTokens } from "../util/tokenUtil";

// create customBaseQuery
const customBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (header) => {
        const accessToken = getDecryptedAccessToken();
        if(accessToken){
           header.set(
             'Authorization', `Bearer ${accessToken}`
           )
        }
        return header;
    }
})

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
                            headers: { "Content-Type": "application/json" },
                        },
                        api,
                        extraOptions
                    );

                    if (refreshResult.data?.data?.accessToken) {
                        // Store new access token
                        storeAccessToken(refreshResult.data.data.accessToken);
                        return { success: true };
                    } else {
                        // Refresh failed, logout
                        clearTokens();
                        window.location.href = "/auth";
                        return { success: false };
                    }
                } catch (e) {
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
    reducerPath: 'baseApi',
    tagTypes: ["Comment", "User"],
    baseQuery: tokenRefreshBaseQuery,
    endpoints: (builder) => ({})
})