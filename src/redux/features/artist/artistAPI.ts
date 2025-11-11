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

    agentRequest: builder.query({
      query: () => ({
        url: "/artist/agent-requests",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const { useGetArtistsQuery, useAgentRequestQuery } = artistAPI;

export default artistAPI;
