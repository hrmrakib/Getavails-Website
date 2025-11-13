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

    getArtistRequests: builder.query({
      query: () => ({
        url: "/agent/artist-requests",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const { useGetAgentOverviewQuery, useGetMyArtistsQuery,  } = agentAPI;
export default agentAPI;
