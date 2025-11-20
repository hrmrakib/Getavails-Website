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
  }),
});

export const { useSendMailMutation } = mailAPI;
export default mailAPI;
