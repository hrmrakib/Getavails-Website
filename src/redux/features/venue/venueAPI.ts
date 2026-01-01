import baseAPI from "@/redux/api/api";

const venueAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getVenueOverview: builder.query({
      query: () => ({
        url: "/venue/overview",
        method: "GET",
      }),
    }),

    availabilityDate: builder.mutation({
      query: (data) => ({
        url: `/profile/update-availability`,
        method: "POST",
        body: data,
      }),
    }),

    updateVenue: builder.mutation({
      query: (data) => ({
        url: `/venue/edit`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetVenueOverviewQuery,
  useAvailabilityDateMutation,
  useUpdateVenueMutation,
} = venueAPI;
export default venueAPI;
