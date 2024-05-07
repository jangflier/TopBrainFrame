import { Route, Routes, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import publicRoutes from "./public";
import protectedRoutes from "./protected";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Suspense, useEffect, useMemo } from "react";
import { useVerifySessionAndSendUserInfoMutation } from "../features/auth/authApi";
import { setUserInfo } from "../features/user/userSlice";
import { authMenu } from "../menu";

const AppRoutes = () => {
	const userInfo = useAppSelector((state: RootState) => state.userInfo);
	const dispatch = useAppDispatch();
	const [reqVerifuSession, { isLoading }] = useVerifySessionAndSendUserInfoMutation();
	const navigate = useNavigate();
	const routes = useMemo(() => (userInfo.id ? protectedRoutes : publicRoutes), [userInfo.id]);

	useEffect(() => {
		console.log(userInfo);
	}, [userInfo]);

	useEffect(() => {
		reqVerifuSession()
			.unwrap()
			.then((resData) => {
				if (resData.ok && resData.data.id) {
					dispatch(setUserInfo(resData.data));
				} else throw new Error(resData.message);
			})
			.catch((error) => {
				navigate(authMenu.signin.path);
			});
		// eslint-disable-next-line
	}, [reqVerifuSession, dispatch]);

	if (isLoading) {
		return <></>;
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				{routes.map((route, index) => (
					<Route key={index} path={route.path} element={route.element} />
				))}
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
