import baseAPI from "@/redux/api/api";

const searchAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    searchVenues: build.query({
      query: (params) => ({
        url: "/venues/search-venues",
        method: "GET",
        params,
      }),
    }),

    searchArtists: build.query({
      query: (params) => ({
        url: "/artists/search-artists",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useSearchVenuesQuery,
  useSearchArtistsQuery,
  useLazySearchVenuesQuery,
  useLazySearchArtistsQuery,
} = searchAPI;
export default searchAPI;
