import baseAPI from "@/redux/api/api";

const bookAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPerformerDetail: builder.query({
      query: (id) => ({
        url: `/system-performers/${id}`,
        method: "GET",
      }),
    }),

    getVenueDetail: builder.query({
      query: (id) => ({
        url: `/system-venues/${id}`,
        method: "GET",
      }),
    }),

    offerRequest: builder.mutation({
      query: (data) => ({
        url: `/offer-request/send`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPerformerDetailQuery,
  useGetVenueDetailQuery,
  useOfferRequestMutation,
} = bookAPI;
export default bookAPI;
