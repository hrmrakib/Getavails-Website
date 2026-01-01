import baseAPI from "@/redux/api/api";

const adminAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverview: builder.query({
      query: () => ({
        url: "/admin/overview",
        method: "GET",
      }),
    }),

    getUsers: builder.query({
      query: ({ role = "", page = 1, limit = 10, search = "" }) => ({
        url: `/admin/users?role=${role}&page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/admin/users/${userId}/delete`,
        method: "DELETE",
      }),
    }),

    getSubscriptionInfo: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/subscriptions?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    getSingleSubscription: builder.query({
      query: (id) => ({
        url: `/subscriptions/${id}`,
        method: "GET",
      }),
    }),

    createSubscription: builder.mutation({
      query: (data) => ({
        url: `/admin/subscriptions`,
        method: "POST",
        body: data,
      }),
    }),

    updateSubscription: builder.mutation({
      query: (data) => ({
        url: `/admin/subscriptions`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteSubscription: builder.mutation({
      query: (data) => ({
        url: `/admin/subscriptions`,
        method: "DELETE",
        body: data,
      }),
    }),

    paySubscription: builder.mutation({
      query: ({ subscriptionId }) => ({
        url: `/subscriptions/${subscriptionId}/subscribe`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAdminOverviewQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetSubscriptionInfoQuery,
  useGetSingleSubscriptionQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  usePaySubscriptionMutation,
} = adminAPI;
