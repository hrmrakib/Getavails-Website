import baseAPI from "@/redux/api/api";
import { create } from "domain";

const offersAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    searchUserByRole: builder.query({
      query: ({ role }) => ({
        url: `/profile/other-users?role=${role}`,
        method: "GET",
      }),
    }),

    createOffer: builder.mutation({
      query: (data) => ({
        url: `/offers`,
        method: "POST",
        body: data,
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

export const {
  useSearchUserByRoleQuery,
  useCreateOfferMutation,
  useGetAllOffersQuery,
} = offersAPI;
export default offersAPI;
