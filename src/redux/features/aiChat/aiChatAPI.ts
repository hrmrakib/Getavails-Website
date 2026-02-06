import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAPI = process.env.NEXT_PUBLIC_AI_CHAT_API;

const aiChatAPI = createApi({
  reducerPath: "aiChatAPI",
  tagTypes: ["Session"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseAPI,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    aiChat: build.mutation({
      query: (body) => ({
        url: "/chat",
        method: "POST",
        body,
      }),
    }),

    createNewChatWithSession: build.mutation({
      query: () => ({
        url: "/create-session",
        method: "POST",
      }),
    }),

    getAllSessionsHistory: build.query({
      query: () => ({
        url: "/sessions",
        method: "GET",
      }),
    }),

    getChatHistoryBySessionId: build.query({
      query: (sessionId) => ({
        url: `chat/history?session_id=${sessionId}`,
        method: "GET",
      }),
    }),

    updateSessionTitle: build.mutation({
      query: (body) => ({
        url: `/sessions/update-title`,
        method: "PATCH",
        body,
      }),
    }),

    deleteSession: build.mutation({
      query: (sessionId) => ({
        url: `/delete-session?session_id=${sessionId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAiChatMutation,
  useCreateNewChatWithSessionMutation,
  useGetAllSessionsHistoryQuery,
  useGetChatHistoryBySessionIdQuery,
  useUpdateSessionTitleMutation,
  useDeleteSessionMutation,
} = aiChatAPI;
export default aiChatAPI;
