import { Navigate, RouteObject } from "react-router-dom";
import { authMenu } from "../menu";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

let publicRoutes: Array<RouteObject> = [];

const authRoutes: Array<RouteObject> = [
	{
		path: authMenu.signin.path,
		element: <SignIn />,
	},
	{
		path: authMenu.signup.path,
		element: <SignUp />,
	},
	{ path: "*", element: <Navigate to={authMenu.signin.path} /> },
];

publicRoutes = [...authRoutes];
export default publicRoutes;
