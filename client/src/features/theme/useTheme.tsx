import { useCallback } from "react";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getSystemTheme } from "./ThemeProvider";
import { setIsDarkTheme } from "./themeSlice";

export type themeType = "light" | "dark" | "system";

export const useTheme = () => {
	const theme = useAppSelector((state: RootState) => state.theme);
	const dispatch = useAppDispatch();

	const setTheme = useCallback(
		(themeMode: themeType) => {
			switch (themeMode) {
				case "light":
					dispatch(setIsDarkTheme(false));
					break;
				case "dark":
					dispatch(setIsDarkTheme(true));
					break;
				case "system":
					dispatch(setIsDarkTheme(getSystemTheme().matches));
					break;
			}
		},
		[dispatch],
	);

	return { theme, setTheme };
};
