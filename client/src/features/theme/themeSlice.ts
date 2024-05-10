import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface themeState {
	isAsideOpen: boolean;
	isDarkMode: boolean;
}

const themeInitState: themeState = {
	isAsideOpen: true,
	isDarkMode: true,
};

export const themeSlice = createSlice({
	name: "theme",
	initialState: themeInitState,
	reducers: {
		setAsideOpen: (state, action: PayloadAction<boolean>) => {
			state.isAsideOpen = action.payload;
		},
		setDarkMode: (state, action: PayloadAction<boolean>) => {
			state.isAsideOpen = action.payload;
		},
	},
});

export const { setAsideOpen, setDarkMode } = themeSlice.actions;
