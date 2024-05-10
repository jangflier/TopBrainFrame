import { Route, Routes } from "react-router-dom";
import protectedRoutes from "../protected";

export const FooterRoutes = () => {
	return (
		<Routes>
			{protectedRoutes.footer.map((route, index) => (
				<Route key={`footer-${index}`} path={route.path} element={route.element} />
			))}
		</Routes>
	);
};
