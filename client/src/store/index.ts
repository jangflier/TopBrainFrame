import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { userInfoSlice } from "../features/user/userSlice";
import { themeSlice } from "../features/theme/themeSlice";
import { userApi } from "../features/user/userApi";

export const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
		userInfo: userInfoSlice.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
