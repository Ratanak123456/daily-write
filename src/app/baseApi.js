import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDecryptedAccessToken } from "../util/tokenUtil";

console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);

// create customBaseQuery
const customBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
        try {
            const accessToken = getDecryptedAccessToken();
            if (accessToken) {
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