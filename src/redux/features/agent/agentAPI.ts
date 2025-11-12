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
  }),
});

export const { useGetAgentOverviewQuery } = agentAPI;
export default agentAPI;
