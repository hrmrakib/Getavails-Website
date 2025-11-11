import baseAPI from "@/redux/api/api";

const artistAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: () => ({
        url: "/artist/agents",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    
  }),
});

export const { useGetArtistsQuery } = artistAPI;

export default artistAPI;
