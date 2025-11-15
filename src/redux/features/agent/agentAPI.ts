import { baseAPI } from "@/redux/api/api";

const agentAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAgentOverview: builder.query({
      query: () => ({
        url: "/agent/overview",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getMyArtists: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/agent/artists?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getNewArtistByAgentPage: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/artists?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getMyArtistRequests: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/agent/artist-requests?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    acceptArtistByAgent: builder.mutation({
      query: (id) => ({
        url: `/agent/approve-artist`,
        method: "POST",
        body: id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    rejectArtistByAgent: builder.mutation({
      query: (id) => ({
        url: `/agent/reject-artist`,
        method: "POST",
        body: id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    deleteArtistByAgent: builder.mutation({
      query: (id) => ({
        url: `/agent/delete-artist`,
        method: "DELETE",
        body: id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAgentOverviewQuery,
  useGetMyArtistsQuery,
  useGetNewArtistByAgentPageQuery,
  useGetMyArtistRequestsQuery,
  useAcceptArtistByAgentMutation,
  useRejectArtistByAgentMutation,
  useDeleteArtistByAgentMutation,
} = agentAPI;
export default agentAPI;
