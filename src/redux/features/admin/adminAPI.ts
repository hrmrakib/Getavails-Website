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
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getUsers: builder.query({
      query: ({ role = "", page = 1, limit = 10, search = "" }) => ({
        url: `/admin/users?role=${role}&page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/admin/users/${userId}/delete`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getSubscriptionInfo: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/subscriptions?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getSingleSubscription: builder.query({
      query: (id) => ({
        url: `/subscriptions/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    createSubscription: builder.mutation({
      query: (data) => ({
        url: `/admin/subscriptions`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    updateSubscription: builder.mutation({
      query: (data) => ({
        url: `/admin/subscriptions`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    deleteSubscription: builder.mutation({
      query: (data) => ({
        url: `/admin/subscriptions`,
        method: "DELETE",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    paySubscription: builder.mutation({
      query: ({ subscriptionId }) => ({
        url: `/subscriptions/${subscriptionId}/subscribe`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
