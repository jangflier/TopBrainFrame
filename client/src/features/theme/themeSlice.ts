import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ThemeState {
	isMobileMode: boolean;
	isMinimizeMode: boolean;
	isAsideOpen: boolean;
	isDarkTheme: boolean;
	asideWidth?: number;
}

const themeInitState: ThemeState = {
	isMobileMode: false,
	isMinimizeMode: false,
	isAsideOpen: true,
	isDarkTheme: false,
};

export const themeSlice = createSlice({
	name: "theme",
	initialState: themeInitState,
	reducers: {
		setMobileMode: (state, action: PayloadAction<ThemeState["isMobileMode"]>) => {
			state.isMobileMode = action.payload;
		},
		setMinimizeMode: (state, action: PayloadAction<ThemeState["isMinimizeMode"]>) => {
			state.isMinimizeMode = action.payload;
		},
		setAsideWidth: (state, action: PayloadAction<ThemeState["asideWidth"]>) => {
			state.asideWidth = action.payload;
		},
		setAsideOpen: (state, action: PayloadAction<ThemeState["isAsideOpen"]>) => {
			state.isAsideOpen = action.payload;
		},
		setIsDarkTheme: (state, action: PayloadAction<boolean>) => {
			state.isDarkTheme = action.payload;
		},
	},
});

export const { setMobileMode, setMinimizeMode, setAsideWidth, setAsideOpen, setIsDarkTheme } =
	themeSlice.actions;
