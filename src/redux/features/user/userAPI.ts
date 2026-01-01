import baseAPI from "@/redux/api/api";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEventList: builder.query({
      query: ({ page, limit, search = "" }) => ({
        url: `/events?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getUpcomingEvents: builder.query({
      query: ({ page, limit, search = "" }) => ({
        url: `/events/upcoming-events?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getASingleEvent: builder.query({
      query: (eventId) => ({
        url: `/events/${eventId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    ticketPurchase: builder.mutation({
      query: (data) => ({
        url: `/tickets/purchase-ticket`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetEventListQuery,
  useGetUpcomingEventsQuery,
  useGetASingleEventQuery,
  useTicketPurchaseMutation,
} = userAPI;

export default userAPI;
