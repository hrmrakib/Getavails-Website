import baseAPI from "@/redux/api/api";

const searchAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    searchVenues: build.query({
      query: (params) => ({
        url: "/system-venues/search-venues",
        method: "GET",
        params,
      }),
    }),

    getAllGenres: build.query({
      query: () => ({
        url: "/system-performers/all-genres",
        method: "GET",
      }),
    }),

    searchArtists: build.query({
      query: (params) => ({
        url: "/system-performers/search-performers",
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
  useGetAllGenresQuery,
} = searchAPI;
export default searchAPI;
