import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserInfoState {
	isSignedIn: boolean;
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const userInfoInitState: UserInfoState = {
	isSignedIn: false,
	id: "",
	firstName: "",
	lastName: "",
	email: "",
};

export const userInfoSlice = createSlice({
	name: "userInfo",
	initialState: userInfoInitState,
	reducers: {
		setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
			const { id, email, firstName, lastName, createdAt, updatedAt } = action.payload;
			state.isSignedIn = true;
			state.id = id;
			state.email = email;
			state.firstName = firstName;
			state.lastName = lastName;
			if (createdAt) state.createdAt = createdAt;
			if (updatedAt) state.updatedAt = updatedAt;
		},
		clearUserInfo: (state) => {
			state.isSignedIn = false;
			state.id = "";
			state.firstName = "";
			state.lastName = "";
			state.email = "";
			delete state.createdAt;
			delete state.updatedAt;
		},
	},
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
