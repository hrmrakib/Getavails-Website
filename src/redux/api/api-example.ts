import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// ? Refresh token request
const refreshToken = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
};

const customBaseQuery: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    toast.error(
      (
        result?.error as {
          data?: {
            message?: string;
          };
        }
      ).data?.message ?? "Something went wrong!"
    );
  } else if (result.error && result.error.status === 403) {
    alert("You need to verify your email to use this feature.");
    window.location.href = "/profile";
  } else if (result.error && result.error.status === 402) {
    alert("You need to upgrade your plan to use this feature.");
    window.location.href = "/#upgrade-plan";
  }

  return result;
};

export const baseAPIExample = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["auth", "Blog", "Profile"],
  endpoints: () => ({}),
});

export default baseAPIExample;

export type TList = {
  page?: number;
  limit?: number;
  search?: string;
};
