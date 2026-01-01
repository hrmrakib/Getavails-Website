import baseAPI from "@/redux/api/api";

const blogAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    uploadMedia: builder.mutation({
      query: (data) => ({
        url: `/upload-media`,
        method: "POST",
        body: data,
      }),
    }),

    getBlogs: builder.query({
      query: ({ page, limit, search = "" }) => ({
        url: `/blogs?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    getBlog: builder.query({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/admin/blogs`,
        method: "DELETE",
        body: blogId,
      }),
      invalidatesTags: ["Blog"],
    }),

    createBlog: builder.mutation({
      query: (data) => ({
        url: `/admin/blogs`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlog: builder.mutation({
      query: (data) => ({
        url: `/admin/blogs`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useUploadMediaMutation,
  useGetBlogsQuery,
  useGetBlogQuery,
  useDeleteBlogMutation,
  useCreateBlogMutation,
  useUpdateBlogMutation,
} = blogAPI;
export default blogAPI;
