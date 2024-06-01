import { Route, Routes } from "react-router-dom";
import { Aside } from "../../components/layout/Aside";

export const AsideRoutes = () => {
	return (
		<Routes>
			<Route path='*' element={<Aside />} />
		</Routes>
	);
};
