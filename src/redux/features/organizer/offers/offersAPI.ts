import baseAPI from "@/redux/api/api";

const offersAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    searchUserByRole: builder.query({
      query: ({ role, search }) => ({
        url: `/profile/other-users?role=${role}&search=${search}`,
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

    acceptOffer: builder.mutation({
      query: (data) => ({
        url: `/offers/accept`, 
        method: "POST",
        body: data,
      }),
    }),

    assignOffer: builder.mutation({
      query: (data) => ({
        url: `/agent/offers/assign`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSearchUserByRoleQuery,
  useCreateOfferMutation,
  useGetAllOffersQuery,
  useAcceptOfferMutation,
  useAssignOfferMutation,
} = offersAPI;
export default offersAPI;
