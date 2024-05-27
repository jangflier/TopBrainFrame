import { lazy } from "react";
import { homeMenu } from "../menu";
import { Navigate, RouteObject } from "react-router-dom";
import { Footer } from "../components/Common/Footer";
import { Header } from "../components/Common/Header";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Calendar = lazy(() => import("../pages/Calendar"));
const Profile = lazy(() => import("../pages/Profile"));

interface ProtectedRoutes {
	header: Array<RouteObject>;
	content: Array<RouteObject>;
	footer: Array<RouteObject>;
}

const commoneHeaderRoutes: Array<RouteObject> = [
	{
		path: "*",
		element: <Header />,
	},
];
const commoneFooterRoutes: Array<RouteObject> = [
	{
		path: "*",
		element: <Footer />,
	},
];

const homeRoutes: Array<RouteObject> = [
	{
		path: homeMenu.dashboard.path,
		element: <Dashboard />,
	},
	{
		path: homeMenu.calendar.path,
		element: <Calendar />,
	},
	{
		path: homeMenu.profile.path,
		element: <Profile />,
	},
	{ path: "*", element: <Navigate to={homeMenu.dashboard.path} /> },
];

const protectedRoutes: ProtectedRoutes = {
	header: [...commoneHeaderRoutes],
	content: [...homeRoutes],
	footer: [...commoneFooterRoutes],
};
export default protectedRoutes;
