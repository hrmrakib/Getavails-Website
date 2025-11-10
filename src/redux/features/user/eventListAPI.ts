import baseAPI from "@/redux/api/api";

const eventListAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEventList: builder.query({
      query: () => ({
        url: `/events`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const { useGetEventListQuery } = eventListAPI;

export default eventListAPI;
