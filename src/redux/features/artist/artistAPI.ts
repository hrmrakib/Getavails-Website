import baseAPI from "@/redux/api/api";

const artistAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => ({
        url: "/artist/overview",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getMyAgents: builder.query({
      query: () => ({
        url: "/artist/agents",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getNewAgents: builder.query({
      query: ({ page = 1, limit = 10, search }) => ({
        url: `/agents/new-agents?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    approveAgent: builder.mutation({
      query: (agent_id) => ({
        url: `/artist/approve-agent`,
        method: "POST",
        body: { agent_id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    rejectAgent: builder.mutation({
      query: (agent_id) => ({
        url: `/artist/reject-agent`,
        method: "POST",
        body: { agent_id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    availabilityDate: builder.mutation({
      query: (data) => ({
        url: `/profile/update-availability`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
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
