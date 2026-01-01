import baseAPI from "@/redux/api/api";

const profileAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
      providesTags: ["Profile"],
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

    withdrawMoney: builder.mutation({
      query: (data) => ({
        url: `/payments/withdraw`,
        method: "POST",
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
  useWithdrawMoneyMutation,
  useDeleteProfileMutation,
} = profileAPI;

export default profileAPI;
