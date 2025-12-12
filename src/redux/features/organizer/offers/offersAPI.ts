import baseAPI from "@/redux/api/api";

const offersAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    searchUserByRole: builder.query({
      query: ({ role }) => ({
        url: `/profile/other-users?role=${role}`,
        method: "GET",
      }),
    }),

    getAllOffers: builder.query({
      query: ({ page, limit, tab }) => ({
        url: `/offers?page=${page}&limit=${limit}&tab=${tab}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchUserByRoleQuery, useGetAllOffersQuery } = offersAPI;
export default offersAPI;
