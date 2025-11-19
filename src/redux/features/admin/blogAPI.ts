import baseAPI from "@/redux/api/api";

const blogAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    uploadMedia: builder.mutation({
      query: (data) => ({
        url: `/upload-media`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getBlogs: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/blogs?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getBlog: builder.query({
      query: ({ blogId }) => ({
        url: `/blog/${blogId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    deleteBlog: builder.mutation({
      query: ({ blogId }) => ({
        url: `/blog/${blogId}/delete`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    createBlog: builder.mutation({
      query: (data) => ({
        url: `/admin/blogs`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    updateBlog: builder.mutation({
      query: (data) => ({
        url: `/blog/update`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
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
