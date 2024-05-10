import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import protectedRoutes from "../protected";

export const ContentRoutes = () => {
	const _Loading = <div>Loading...</div>;

	return (
		<main className='content'>
			<Suspense fallback={_Loading}>
				<Routes>
					{protectedRoutes.content.map((route, index) => (
						<Route key={`content-${index}`} path={route.path} element={route.element} />
					))}
				</Routes>
			</Suspense>
		</main>
	);
};
