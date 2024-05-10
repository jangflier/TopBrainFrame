import { Route, Routes, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import publicRoutes from "./public";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { useVerifySessionAndSendUserInfoMutation } from "../features/auth/authApi";
import { setUserInfo } from "../features/user/userSlice";
import { authMenu } from "../menu";
import { Aside } from "../components/layout/Aside";
import { PageWrapper } from "../components/layout/PageWrapper";
import { ContentRoutes } from "./routesComponent/ContentRoutes";
import { FooterRoutes } from "./routesComponent/FooterRoutes";
import { HeaderRoutes } from "./routesComponent/HeaderRoutes";

const AppRoutes = () => {
	const userInfo = useAppSelector((state: RootState) => state.userInfo);
	const dispatch = useAppDispatch();
	const [reqVerifuSession, { isLoading }] = useVerifySessionAndSendUserInfoMutation();
	const navigate = useNavigate();

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
	if (!userInfo.id) {
		return (
			<Routes>
				{publicRoutes.map((route, index) => (
					<Route key={index} path={route.path} element={route.element} />
				))}
			</Routes>
		);
	}
	return (
		<div className='app'>
			<Routes>
				<Route path='*' element={<Aside />} />
			</Routes>
			<PageWrapper>
				<HeaderRoutes />
				<ContentRoutes />
				<FooterRoutes />
			</PageWrapper>
		</div>
	);
};

export default AppRoutes;
