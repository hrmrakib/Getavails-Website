import { baseAPI } from "@/redux/api/api";

const agentAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAgentOverview: builder.query({
      query: () => ({
        url: "/agent/overview",
        method: "GET",
      }),
    }),

    getMyArtists: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/agent/artists?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    getNewArtistByAgentPage: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/artists/new-artists?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    getMyArtistRequests: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/agent/artist-requests?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    inviteArtistByAgent: builder.mutation({
      query: (data) => ({
        url: `/agent/invite-artist`,
        method: "POST",
        body: data,
      }),
    }),

    acceptArtistByAgent: builder.mutation({
      query: (data) => ({
        url: `/agent/approve-artist`,
        method: "POST",
        body: data,
      }),
    }),

    rejectArtistByAgent: builder.mutation({
      query: (data) => ({
        url: `/agent/reject-artist`,
        method: "POST",
        body: data,
      }),
    }),

    deleteArtistByAgent: builder.mutation({
      query: (id) => ({
        url: `/agent/delete-artist`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const {
  useGetAgentOverviewQuery,
  useGetMyArtistsQuery,
  useGetNewArtistByAgentPageQuery,
  useGetMyArtistRequestsQuery,
  useInviteArtistByAgentMutation,
  useAcceptArtistByAgentMutation,
  useRejectArtistByAgentMutation,
  useDeleteArtistByAgentMutation,
} = agentAPI;
export default agentAPI;
