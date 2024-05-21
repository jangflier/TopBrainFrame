import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SigninReqData, SigninResData, ApiResponse, SignupReqData } from "./authTypes";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/auth/" }),
	endpoints: (builder) => ({
		signin: builder.mutation<SigninResData, SigninReqData>({
			query: (signinData) => ({
				url: "signin",
				method: "POST",
				body: signinData,
			}),
		}),
		signup: builder.mutation<ApiResponse, SignupReqData>({
			query: (signupData) => ({
				url: "signup",
				method: "POST",
				body: signupData,
			}),
		}),
		signout: builder.mutation<ApiResponse, void>({
			query: () => ({
				url: "signout",
				method: "POST",
			}),
		}),
	}),
});

export const { useSigninMutation, useSignupMutation, useSignoutMutation } = authApi;
