import { FC, HTMLAttributes } from "react";

interface PageWrapperProps extends HTMLAttributes<HTMLElement> {}

export const PageWrapper: FC<PageWrapperProps> = ({ children, className = "" }) => {
	return <div className={`page-wrapper ${className}`}>{children}</div>;
};
