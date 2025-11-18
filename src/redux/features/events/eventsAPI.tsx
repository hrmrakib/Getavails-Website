import baseAPI from "@/redux/api/api";

const eventsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEventList: builder.query({
      query: ({ status = "" }) => ({
        url: `/organizer/events?status=${status}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    endEvent: builder.mutation({
      query: (data) => ({
        url: `/organizer/events/complete-event`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    createNewEvent: builder.mutation({
      query: (data) => ({
        url: `/organizer/events/create-event`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    updateEvent: builder.mutation({
      query: (data) => ({
        url: `/organizer/events/update-event`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetEventListQuery,
  useEndEventMutation,
  useCreateNewEventMutation,
  useUpdateEventMutation,
} = eventsAPI;
export default eventsAPI;
