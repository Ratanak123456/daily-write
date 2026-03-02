import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDecryptedAccessToken } from "../util/tokenUtil";
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

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ["Comment", "User"],
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({})
})