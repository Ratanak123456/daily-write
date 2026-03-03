import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDecryptedAccessToken } from "../util/tokenUtil";

// Clean and validate the base URL
const getBaseUrl = () => {
    const url = import.meta.env.VITE_BASE_URL?.trim() || '';
    // Remove any quotes if present
    const cleanUrl = url.replace(/^["']|["']$/g, '');
    // Ensure it starts with https://
    if (!cleanUrl.startsWith('http')) {
        console.error("Invalid VITE_BASE_URL:", cleanUrl);
        return 'https://blog-api.bykh.org/api/v100'; // Fallback
    }
    return cleanUrl;
};

console.log("VITE_BASE_URL:", getBaseUrl());

// Helper to check if a token looks valid (not empty/invalid)
const isValidToken = (token) => {
    return token && typeof token === 'string' && token.length > 0 && token !== 'null' && token !== 'undefined';
};

// create customBaseQuery
const customBaseQuery = fetchBaseQuery({
    baseUrl: getBaseUrl(),
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