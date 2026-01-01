import baseAPI from "@/redux/api/api";

const artistAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => ({
        url: "/artist/overview",
        method: "GET",
      }),
    }),

    getMyAgents: builder.query({
      query: () => ({
        url: "/artist/agents",
        method: "GET",
      }),
    }),

    getNewAgents: builder.query({
      query: ({ page = 1, limit = 10, search }) => ({
        url: `/agents/new-agents?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    inviteAgentByArtist: builder.mutation({
      query: (data) => ({
        url: `/artist/invite-agent`,
        method: "POST",
        body: data,
      }),
    }),

    agentRequest: builder.query({
      query: ({ page = 1, limit = 10, search }) => ({
        url: `/artist/agent-requests?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    approveAgent: builder.mutation({
      query: (agent_id) => ({
        url: `/artist/approve-agent`,
        method: "POST",
        body: { agent_id },
      }),
    }),

    rejectAgent: builder.mutation({
      query: (agent_id) => ({
        url: `/artist/reject-agent`,
        method: "POST",
        body: { agent_id },
      }),
    }),

    availabilityDate: builder.mutation({
      query: (data) => ({
        url: `/profile/update-availability`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetMyAgentsQuery,
  useGetNewAgentsQuery,
  useInviteAgentByArtistMutation,
  useAgentRequestQuery,
  useApproveAgentMutation,
  useRejectAgentMutation,
  useAvailabilityDateMutation,
} = artistAPI;

export default artistAPI;
