import { FC, HTMLAttributes, useCallback, useEffect, useLayoutEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { useTheme } from "./useTheme";
import { RootState } from "../../store";
import useLocalStorage from "../../utils/useLocalStorage";

export interface themeTypeProps extends HTMLAttributes<HTMLElement> {}

export const getSystemTheme = () => {
	return window.matchMedia("(prefers-color-scheme: dark)");
};

export const ThemeProvider: FC<themeTypeProps> = ({ children }) => {
	const userInfo = useAppSelector((state: RootState) => state.userInfo);
	const [storedTheme] = useLocalStorage("theme");
	const { theme, setTheme } = useTheme();

	const handleThemeChange = useCallback(
		(e: MediaQueryListEvent) => {
			if (storedTheme === "system") setTheme(e.matches ? "dark" : "light");
		},
		[storedTheme, setTheme],
	);

	useEffect(() => {
		document.body.setAttribute("data-bs-theme", theme.isDarkTheme ? "dark" : "light");
	}, [theme.isDarkTheme]);

	useLayoutEffect(() => {
		const matchDark = getSystemTheme();

		if (storedTheme) {
			setTheme(storedTheme);
		} else {
			setTheme("system");
		}

		matchDark.addEventListener("change", handleThemeChange);
		return () => {
			matchDark.removeEventListener("change", handleThemeChange);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div
				className={
					userInfo.isSignedIn ? "background auth-background" : "background auth-background show"
				}
				data-theme={theme.isDarkTheme ? "dark" : "light"}
			/>
			<div
				className={
					userInfo.isSignedIn ? "background home-background show" : "background home-background"
				}
				data-theme={theme.isDarkTheme ? "dark" : "light"}
			/>
			{children}
		</>
	);
};
