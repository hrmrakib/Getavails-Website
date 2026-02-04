import baseAPI from "@/redux/api/api";

const tourManagerAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    connectGoogleCalendar: build.mutation({
      query: () => ({
        url: `/calendars/generate-auth-url`,
        method: "POST",
      }),
    }),

    getGoogleCalendarEvents: build.query({
      query: ({
        start_date_time,
        end_date_time,
        limit,
        user_id,
      }: {
        start_date_time?: string;
        end_date_time?: string;
        limit?: number;
        user_id?: string;
      }) => {
        const query = new URLSearchParams({});

        if (start_date_time) query.set("start_date_time", start_date_time);
        if (end_date_time) query.set("end_date_time", end_date_time);
        if (limit) query.set("limit", limit.toString());
        if (user_id) query.set("user_id", user_id);

        return {
          url: `/calendars/events?${query.toString()}`,
          method: "GET",
          // params: { start_date_time, end_date_time, limit, user_id },
        };
      },
    }),
  }),
});

export const {
  useConnectGoogleCalendarMutation,
  useGetGoogleCalendarEventsQuery,
} = tourManagerAPI;
export default tourManagerAPI;
