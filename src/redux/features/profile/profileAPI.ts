import baseAPI from "@/redux/api/api";

const profileAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/profile`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/profile/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileAPI;

export default profileAPI;
