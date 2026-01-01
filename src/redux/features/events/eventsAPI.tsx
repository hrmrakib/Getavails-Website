import baseAPI from "@/redux/api/api";

const eventsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEventList: builder.query({
      query: ({ status = "" }) => ({
        url: `/organizer/events?status=${status}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    endEvent: builder.mutation({
      query: (data) => ({
        url: `/organizer/events/complete-event`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    createNewEvent: builder.mutation({
      query: (data) => ({
        url: `/organizer/events/create-event`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    updateEvent: builder.mutation({
      query: (data) => ({
        url: `/organizer/events/update-event`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getTickets: builder.query({
      query: ({ page = 1, limit = 10, status = "", search = "" }) => ({
        url: `/organizer/tickets?page=${page}&limit=${limit}&status=${status}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
  useGetTicketsQuery,
} = eventsAPI;
export default eventsAPI;
