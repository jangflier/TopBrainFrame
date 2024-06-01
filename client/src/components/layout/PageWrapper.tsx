import { FC, HTMLAttributes, useLayoutEffect, useRef } from "react";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";

interface PageWrapperProps extends HTMLAttributes<HTMLElement> {}

export const PageWrapper: FC<PageWrapperProps> = ({ children, className = "" }) => {
	const theme = useAppSelector((state: RootState) => state.theme);
	const pageWrapperRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (pageWrapperRef.current) {
			if (theme.isMobileMode) {
				pageWrapperRef.current.style.marginLeft = "0";
			} else {
				pageWrapperRef.current.style.marginLeft = `${theme.asideWidth}px`;
			}
		}
	}, [theme.isMobileMode, theme.asideWidth]);

	return (
		<div
			ref={pageWrapperRef}
			className={`page-wrapper ${theme.isMobileMode ? "mobile" : ""} ${
				theme.isMinimizeMode ? "minimize" : ""
			} ${className}`}>
			{children}
		</div>
	);
};
