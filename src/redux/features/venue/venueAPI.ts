import baseAPI from "@/redux/api/api";

const venueAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getVenueOverview: builder.query({
      query: () => ({
        url: "/venue/overview",
        method: "GET",
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

    updateVenue: builder.mutation({
      query: (data) => ({
        url: `/venue/edit`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
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
