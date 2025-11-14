import baseAPI from "@/redux/api/api";

const artistAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => ({
        url: "/artist/overview",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    getArtists: builder.query({
      query: () => ({
        url: "/artist/agents",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getNewAgents: builder.query({
      query: ({ page = 1, limit = 10, search }) => ({
        url: `/agents?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    agentRequest: builder.query({
      query: ({ page = 1, limit = 10, search }) => ({
        url: `/artist/agent-requests?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    approveAgent: builder.mutation({
      query: (agent_id) => ({
        url: `/artist/approve-agent`,
        method: "POST",
        body: { agent_id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    rejectAgent: builder.mutation({
      query: (agent_id) => ({
        url: `/artist/reject-agent`,
        method: "POST",
        body: { agent_id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    availabilityDate: builder.mutation({
      query: (data) => ({
        url: `/profile/update-availability`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetArtistsQuery,
  useGetNewAgentsQuery,
  useAgentRequestQuery,
  useApproveAgentMutation,
  useRejectAgentMutation,
  useAvailabilityDateMutation,
} = artistAPI;

export default artistAPI;
