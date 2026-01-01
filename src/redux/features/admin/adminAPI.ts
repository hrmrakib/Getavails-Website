import baseAPI from "@/redux/api/api";
import { create } from "domain";
import { get } from "http";

const adminAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverview: builder.query({
      query: () => ({
        url: "/admin/overview",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getUsers: builder.query({
      query: ({ role = "", page = 1, limit = 10, search = "" }) => ({
        url: `/admin/users?role=${role}&page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/admin/users/${userId}/delete`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    createSubscription: builder.mutation({
      query: (data) => ({
        url: `/admin/subscriptions`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    updateSubscription: builder.mutation({
      query: (data) => ({
        url: `/admin/subscriptions`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    deleteSubscription: builder.mutation({
      query: (data) => ({
        url: `/admin/subscriptions`,
        method: "DELETE",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    paySubscription: builder.mutation({
      query: ({ subscriptionId }) => ({
        url: `/subscriptions/${subscriptionId}/subscribe`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
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
