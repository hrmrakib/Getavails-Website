import baseAPI from "@/redux/api/api";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEventList: builder.query({
      query: ({ page, limit, search = "" }) => ({
        url: `/events?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    ticketPurchase: builder.mutation({
      query: (data) => ({
        url: `/tickets/purchase-ticket`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const { useGetEventListQuery, useTicketPurchaseMutation } = userAPI;

export default userAPI;
