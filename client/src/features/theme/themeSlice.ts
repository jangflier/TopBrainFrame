import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface themeState {
	isAsideOpen: boolean;
	isDarkTheme: boolean;
}

const themeInitState: themeState = {
	isAsideOpen: true,
	isDarkTheme: false,
};

export const themeSlice = createSlice({
	name: "theme",
	initialState: themeInitState,
	reducers: {
		setIsAsideOpen: (state, action: PayloadAction<boolean>) => {
			state.isAsideOpen = action.payload;
		},
		setIsDarkTheme: (state, action: PayloadAction<boolean>) => {
			state.isDarkTheme = action.payload;
		},
	},
});

export const { setIsAsideOpen, setIsDarkTheme } = themeSlice.actions;
