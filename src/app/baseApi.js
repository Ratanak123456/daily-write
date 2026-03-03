import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDecryptedAccessToken, isAccessTokenExpired, refreshAccessToken, clearTokens } from "../util/tokenUtil";

// Hardcoded URL
const BASE_URL = "https://blog-api.bykh.org/api/v100";

// Helper to check if a token looks valid
const isValidToken = (token) => {
    return token && typeof token === 'string' && token.length > 0 && token !== 'null' && token !== 'undefined';
};

// Custom base query with token refresh logic
const customBaseQuery = async (args, api, extraOptions) => {
    // First, try to get a valid token
    let accessToken = getDecryptedAccessToken();

    // If access token is expired, try to refresh it
    if (!isValidToken(accessToken) || isAccessTokenExpired()) {
        accessToken = await refreshAccessToken();

        // If refresh failed, user is logged out
        if (!accessToken) {
            return { error: { status: 401, data: "Session expired" } };
        }
    }

    // Make the request with the valid token
    const result = await fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            try {
                if (isValidToken(accessToken)) {
                    headers.set('Authorization', `Bearer ${accessToken}`)
                }
            } catch (error) {
                console.warn("Failed to set authorization header:", error);
            }
            return headers;
        }
    })(args, api, extraOptions);

    // If we get 401, try to refresh the token once
    if (result.error?.status === 401) {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
            // Retry the request with the new token
            return fetchBaseQuery({
                baseUrl: BASE_URL,
                prepareHeaders: (headers) => {
                    headers.set('Authorization', `Bearer ${newAccessToken}`)
                    return headers;
                }
            })(args, api, extraOptions);
        } else {
            // Refresh failed, clear tokens
            clearTokens();
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ["Comment", "User"],
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({})
})
