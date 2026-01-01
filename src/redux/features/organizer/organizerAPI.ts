import baseAPI from "@/redux/api/api";

const organizerAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizerOverview: builder.query({
      query: () => ({
        url: "/organizer/overview",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAllAgent: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/agents?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getAgentOfferRequest: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/agent-offers?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getConfirmedOffer: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/active-artists?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    acceptAgentOffer: builder.mutation({
      query: (data) => ({
        url: `/organizer/accept-agent-offer`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    // venue management api
    getAllVenue: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/venues?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getConfirmedVenue: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/active-venues?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
    getVenueOfferRequest: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/venue-offers?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
  useGetVenueOfferRequestQuery,
} = organizerAPI;
export default organizerAPI;
