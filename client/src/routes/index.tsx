import { Route, Routes, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import publicRoutes from "./public";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { setUserInfo } from "../features/user/userSlice";
import { authMenu } from "../menu";
import { Aside } from "../components/layout/Aside";
import { PageWrapper } from "../components/layout/PageWrapper";
import { ContentRoutes } from "./routesComponent/ContentRoutes";
import { FooterRoutes } from "./routesComponent/FooterRoutes";
import { HeaderRoutes } from "./routesComponent/HeaderRoutes";
import { useUserInfoMutation } from "../features/user/userApi";

const AppRoutes = () => {
	const userInfo = useAppSelector((state: RootState) => state.userInfo);
	const dispatch = useAppDispatch();
	const [reqUserInfo, { isLoading }] = useUserInfoMutation();
	const navigate = useNavigate();

	useEffect(() => {
		console.log(userInfo);
	}, [userInfo]);

	useEffect(() => {
		reqUserInfo()
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
	}, [reqUserInfo, dispatch]);

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
