import baseAPI from "@/redux/api/api";

const artistAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
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
      query: () => ({
        url: "/agents",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    agentRequest: builder.query({
      query: () => ({
        url: "/artist/agent-requests",
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
  useGetArtistsQuery,
  useGetNewAgentsQuery,
  useAgentRequestQuery,
  useApproveAgentMutation,
  useRejectAgentMutation,
  useAvailabilityDateMutation,
} = artistAPI;

export default artistAPI;
