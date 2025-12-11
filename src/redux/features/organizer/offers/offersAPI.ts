import baseAPI from "@/redux/api/api";

const offersAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    searchUserByRole: builder.query({
      query: (role) => ({
        url: `/profile/other-users?role=${role}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchUserByRoleQuery } = offersAPI;
export default offersAPI;
