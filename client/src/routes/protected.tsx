import { lazy } from "react";
import { homeMenu } from "../menu";
import { Navigate, RouteObject } from "react-router-dom";

let protectedRoutes: Array<RouteObject> = [];

const Dashboard = lazy(() => import("../pages/Dashboard"));

const homeRoutes: Array<RouteObject> = [
	{
		path: homeMenu.dashboard.path,
		element: <Dashboard />,
	},
	{ path: "*", element: <Navigate to={homeMenu.dashboard.path} /> },
];

protectedRoutes = [...homeRoutes];
export default protectedRoutes;
