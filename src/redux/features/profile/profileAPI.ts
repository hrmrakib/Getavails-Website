import baseAPI from "@/redux/api/api";

const profileAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
    }),

    connectToStripe: builder.mutation({
      query: () => ({
        url: `/profile/connect-stripe`,
        method: "POST",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/profile/edit`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteProfile: builder.mutation({
      query: () => ({
        url: `/profile/delete`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useConnectToStripeMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileAPI;

export default profileAPI;
