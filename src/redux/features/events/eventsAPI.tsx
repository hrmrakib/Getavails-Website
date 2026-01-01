import baseAPI from "@/redux/api/api";

const eventsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEventList: builder.query({
      query: ({ status = "" }) => ({
        url: `/organizer/events?status=${status}`,
        method: "GET",
      }),
    }),

    endEvent: builder.mutation({
      query: (data) => ({
        url: `/organizer/events/complete-event`,
        method: "POST",
        body: data,
      }),
    }),

    createNewEvent: builder.mutation({
      query: (data) => ({
        url: `/organizer/events/create-event`,
        method: "POST",
        body: data,
      }),
    }),

    updateEvent: builder.mutation({
      query: (data) => ({
        url: `/organizer/events/update-event`,
        method: "POST",
        body: data,
      }),
    }),

    getTickets: builder.query({
      query: ({ page = 1, limit = 10, status = "", search = "" }) => ({
        url: `/organizer/tickets?page=${page}&limit=${limit}&status=${status}&search=${search}`,
        method: "GET",
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
