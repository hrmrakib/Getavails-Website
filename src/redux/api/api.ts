import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage?.getItem("access_token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    toast.error("Session expired. Please login again.");

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  } else if (result.error && result.error.status === 403) {
    alert("You need to verify your email to use this feature.");
    window.location.href = "/profile";
  } else if (result.error && result.error.status === 402) {
    alert("You need to upgrade your plan to use this feature.");
    window.location.href = "/#upgrade-plan";
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["auth", "Blog", "Profile"],
  endpoints: () => ({}),
});

export default baseAPI;

export type TList = {
  page?: number;
  limit?: number;
  search?: string;
};
