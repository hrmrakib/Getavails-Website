import baseAPI from "@/redux/api/api";

const organizerAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizerOverview: builder.query({
      query: () => ({
        url: "/organizer/overview",
        method: "GET",
      }),
    }),

    getAllAgent: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/agents?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    getAgentOfferRequest: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/agent-offers?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    getConfirmedOffer: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/active-artists?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    acceptAgentOffer: builder.mutation({
      query: (data) => ({
        url: `/organizer/accept-agent-offer`,
        method: "POST",
        body: data,
      }),
    }),

    // venue management api
    getAllVenue: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/venues?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    getConfirmedVenue: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/active-venues?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),
    getVenueOfferRequest: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `/organizer/venue-offers?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
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
