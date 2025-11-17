import baseAPI from "@/redux/api/api";

const organizerAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizerOverview: builder.query({
      query: () => ({
        url: "/organizer/overview",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    agentOffers: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/agent-offers?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    offerRequest: builder.mutation({
      query: (data) => ({
        url: "/organizer/agent-offers",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getConfirmedOffer: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/active-artists?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetOrganizerOverviewQuery,
  useAgentOffersQuery,
  useGetConfirmedOfferQuery,
} = organizerAPI;
export default organizerAPI;
