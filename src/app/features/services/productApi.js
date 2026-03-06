import { baseApi } from "../../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getallproducts
    getAllProduct: builder.query({
      query: ({ pageNumber = 0, pageSize = 12, sortBy = "createdAt,desc" }) =>
        `/blogs?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`,
      providesTags: ["Blog"],
    }),
    getLatestBlogs: builder.query({
      query: () => `/blogs?pageNumber=0&pageSize=6&sortBy=createdAt,desc`,
    }),
    getTrendingBlogs: builder.query({
      query: () => `/blogs?pageNumber=0&pageSize=6&sortBy=view,desc`,
    }),
    getSignleProduct: builder.query({
      query: () => `/blogs?pageSize=1&sortBy=view,desc`,
    }),
    getBlogByUuid: builder.query({
      query: (uuid) => `/blogs/${uuid}`,
    }),
    getAllProductByCurrentUserUuid: builder.query({
      query: ({ userUuid, pageNumber = 0, pageSize = 12 }) =>
        `/blogs/user/${userUuid}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: ["Blog"],
    }),
    getAllUser: builder.query({
      query: () => `/users`,
    }),
    getCommentsByBlog: builder.query({
      query: ({ blogUuid, pageNumber = 0, pageSize = 20 }) =>
        `/comments?blogUuid=${blogUuid}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: (result, error, { blogUuid }) => [
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

    uploadMedia: builder.mutation({
      query: (formData) => ({
        url: "/medias",
        method: "POST",
        body: formData,
      }),
    }),

    createBlog: builder.mutation({
      query: (payload) => ({
        url: "/blogs",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ uuid, payload }) => ({
        url: `/blogs/${uuid}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Blog"],
    }),

    deleteBlog: builder.mutation({
      query: (uuid) => ({
        url: `/blogs/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
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
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = productApi;
