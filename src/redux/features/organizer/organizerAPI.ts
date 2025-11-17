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

    getAllAgent: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/agents?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getAgentOfferRequest: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/agent-offers?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
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

    acceptAgentOffer: builder.mutation({
      query: (data) => ({
        url: `/organizer/accept-agent-offer`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    // venue management api
    getAllVenue: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/venues?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getConfirmedVenue: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/active-venues?page=${page}&limit=${limit}&search=${search}`,
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
  useGetAllAgentQuery,
  useGetAgentOfferRequestQuery,
  useGetConfirmedOfferQuery,
  useAcceptAgentOfferMutation,
  useGetAllVenueQuery,
  useGetConfirmedVenueQuery,
} = organizerAPI;
export default organizerAPI;
