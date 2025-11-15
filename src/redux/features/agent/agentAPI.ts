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
      query: ({ page = 1, limit = 10 }) => ({
        url: `/agent/artists?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getMyArtistRequests: builder.query({
      query: () => ({
        url: "/agent/artist-requests",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    deleteArtist: builder.mutation({
      query: (id) => ({
        url: `/agent/reject-artist`,
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
  useGetMyArtistRequestsQuery,
  useDeleteArtistMutation,
} = agentAPI;
export default agentAPI;
