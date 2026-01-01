import baseAPI from "@/redux/api/api";

const mailAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    sendMail: builder.mutation({
      query: (data) => ({
        url: "/mails",
        method: "POST",
        body: data,
      }),
    }),

    getUserMail: builder.query({
      query: ({ page, limit, search, unread, remarks }) => {
        const query = new URLSearchParams({});

        if (page) query.set("page", page.toString());
        if (limit) query.set("limit", limit.toString());
        if (search) query.set("search", search);
        if (unread && unread !== undefined)
          query.set("unread", unread.toString());
        if (remarks) query.set("remarks", remarks.toString());

        return {
          url: `/admin/mails?page=${page}&limit=${limit}&search=${search}&unread=${unread}&remarks=${remarks}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("access_token")}`,
          },
        };
      },
    }),

    getSingleMail: builder.query({
      query: (id) => ({
        url: `/admin/mails/${id}`,
        method: "GET",
      }),
    }),

    markAsRead: builder.mutation({
      query: (data) => ({
        url: `/admin/mails/mark-as-read`,
        method: "POST",
        body: data,
      }),
    }),

    markAsUnread: builder.mutation({
      query: (data) => ({
        url: `/admin/mails/mark-as-unread`,
        method: "POST",
        body: data,
      }),
    }),

    deleteMail: builder.mutation({
      query: (id) => ({
        url: `/admin/mails/delete-single-mail`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const {
  useSendMailMutation,
  useGetUserMailQuery,
  useGetSingleMailQuery,
  useMarkAsReadMutation,
  useMarkAsUnreadMutation,
  useDeleteMailMutation,
} = mailAPI;
export default mailAPI;
