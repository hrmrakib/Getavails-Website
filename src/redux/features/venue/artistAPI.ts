import baseAPI from "@/redux/api/api";

const venueAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => ({
        url: "/venue/overview",
        method: "GET",
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

export const { useGetOverviewQuery, useAvailabilityDateMutation } = venueAPI;
export default venueAPI;
