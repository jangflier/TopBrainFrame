import { Route, Routes } from "react-router-dom";
import protectedRoutes from "../protected";

export const HeaderRoutes = () => {
	return (
		<Routes>
			{protectedRoutes.header.map((route, index) => (
				<Route key={`header-${index}`} path={route.path} element={route.element} />
			))}
		</Routes>
	);
};
