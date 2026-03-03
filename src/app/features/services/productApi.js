import { baseApi } from "../../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getallproducts
    getAllProduct: builder.query({
      query: ({ pageNumber = 0, pageSize = 10 }) =>
        `/blogs?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    getLatestBlogs: builder.query({
      query: () => `/blogs?pageNumber=0&pageSize=10`,
    }),
    getTrendingBlogs: builder.query({
      query: () => `/blogs?pageNumber=0&pageSize=10`,
    }),
    getSignleProduct: builder.query({
      query: () => `/blogs?pageSize=1`,
    }),
    getBlogByUuid: builder.query({
      query: (uuid) => `/blogs/${uuid}`,
    }),
    getAllProductByCurrentUserUuid: builder.query({
      query: ({ userUuid, pageNumber = 0, pageSize = 10 }) =>
        `/blogs/user/${userUuid}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    getAllUser: builder.query({
      query: () => `/users`,
    }),
    getCommentsByBlog: builder.query({
      query: ({ blogUuid, pageNumber = 0, pageSize = 10 }) =>
        `/comments?blogUuid=${blogUuid}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: (result, error, { blogUuid }) => [
        { type: "Comment", id: blogUuid },
      ],
    }),

    createComment: builder.mutation({
      query: ({ blogUuid, userUuid, content }) => ({
        url: "/comments",
        method: "POST",
        body: { blogUuid, userUuid, content },
      }),
      invalidatesTags: (result, error, { blogUuid }) => [
        { type: "Comment", id: blogUuid },
      ],
    }),

    patchUser: builder.mutation({
      query: ({ uuid, payload }) => ({
        url: `/users/${uuid}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    uploadMedia: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/medias",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

// export hook
export const {
  useGetAllProductQuery,
  useGetAllUserQuery,
  useGetSignleProductQuery,
  useGetLatestBlogsQuery,
  useGetTrendingBlogsQuery,
  useGetBlogByUuidQuery,
  useGetAllProductByCurrentUserUuidQuery,
  useGetCommentsByBlogQuery,
  useCreateCommentMutation,
  usePatchUserMutation,
  useUploadMediaMutation,
} = productApi;
