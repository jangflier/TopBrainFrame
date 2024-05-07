import { FC, HTMLAttributes, useLayoutEffect } from "react";

interface PageProps extends HTMLAttributes<HTMLElement> {}

export const Page: FC<PageProps> = ({ children, className = "", title }) => {
	useLayoutEffect(() => {
		document.title = title || "";
	});

	return <div className={`full-viewport p-1 ${className}`}>{children}</div>;
};
