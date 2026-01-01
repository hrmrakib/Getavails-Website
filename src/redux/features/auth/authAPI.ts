import baseAPI from "@/redux/api/api";
import { setUser } from "./authSlice";
import profileAPI from "../profile/profileAPI";

const AuthenticationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   const { data } = await queryFulfilled;
      //   dispatch(setUser({ user: data.data, token: data.access_token }));
      // },

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          setUser({
            user: data.data,
            token: data.access_token,
          })
        );

        dispatch(
          profileAPI.endpoints.getProfile.initiate(undefined, {
            forceRefetch: true,
          })
        );
      },

      invalidatesTags: ["auth", "Profile"],
    }),

    googleLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/google-login",
        method: "POST",
        body,
      }),
    }),

    getNewaccess_token: builder.mutation({
      query: (body) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body,
      }),
    }),

    agentRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/agent-register",
        method: "POST",
        body: data,
      }),
    }),

    artistRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/artist-register",
        method: "POST",
        body: data,
      }),
    }),

    venueRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/venue-register",
        method: "POST",
        body: data,
      }),
    }),

    buyerRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    organizerRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/organizer-register",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/account-verify",
        method: "POST",
        body,
      }),
    }),

    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
    }),

    resendOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/account-verify/otp-send",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    verifyForgetPasswordOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password/otp-verify",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useGetNewaccess_tokenMutation,
  useAgentRegisterMutation,
  useArtistRegisterMutation,
  useVenueRegisterMutation,
  useBuyerRegisterMutation,
  useOrganizerRegisterMutation,
  useVerifyOtpMutation,
  useSendOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyForgetPasswordOtpMutation,
} = AuthenticationAPI;
export default AuthenticationAPI;
