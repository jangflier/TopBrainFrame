import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SigninResData } from "../auth/authTypes";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/user" }),
	endpoints: (builder) => ({
		userInfo: builder.mutation<SigninResData, void>({
			query: () => ({
				url: "",
				method: "GET",
			}),
		}),
	}),
});

export const { useUserInfoMutation } = userApi;
