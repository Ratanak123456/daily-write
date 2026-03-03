import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDecryptedAccessToken } from "../util/tokenUtil";

console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);

// Helper to check if a token looks valid (not empty/invalid)
const isValidToken = (token) => {
    return token && typeof token === 'string' && token.length > 0 && token !== 'null' && token !== 'undefined';
};

// create customBaseQuery
const customBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
        try {
            const accessToken = getDecryptedAccessToken();
            // Only add Authorization header if token is valid
            if (isValidToken(accessToken)) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            }
        } catch (error) {
            // If token decryption fails, just skip adding the header
            console.warn("Failed to get access token:", error);
        }
        return headers;
    }
})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ["Comment", "User"],
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({})
})