import page from "@/app/dashboard/venue/message/[id]/page";
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
      query: ({
        page,
        limit,
        search,
        genres,
        radius_mi,
        location_lat,
        location_lng,
      }) => {
        // url: "/system-performers/search-performers",
        // method: "GET",
        // params,

        const query = new URLSearchParams({});

        if (page) query.set("page", page.toString());
        if (limit) query.set("limit", limit.toString());
        if (search) query.set("search", search);
        if (genres) query.set("genres", genres);
        if (radius_mi) query.set("radius_mi", radius_mi.toString());
        if (location_lat) query.set("location_lat", location_lat.toString());
        if (location_lng) query.set("location_lng", location_lng.toString());

        return {
          url: `/system-performers/search-performers?${query.toString()}`,
          method: "GET",
        };
      },
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
