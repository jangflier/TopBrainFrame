import { FC, HTMLAttributes, useLayoutEffect } from "react";

interface CenteredPageProps extends HTMLAttributes<HTMLElement> {}

export const CenteredPage: FC<CenteredPageProps> = ({ children, className = "", title }) => {
	useLayoutEffect(() => {
		document.title = title || "";
	});

	return (
		<main>
			<div
				className={`full-viewport row g-0 d-flex justify-content-center align-items-center blueprint-grid overflow-auto`}>
				<div className={`col-xxl-3 col-xl-5 col-lg-6 col-md-8 col-sm-9 p-2 ${className}`}>{children}</div>
			</div>
		</main>
	);
};
