import { FC, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";
import { SignOutButton } from "../../features/auth/SignOutButton";
import { AsideNav } from "./AsideNav";
import { homeMenu } from "../../menu";
import { MobileModeButton } from "../../features/theme/MobileModeButton";
import { MinimizeModeButton } from "../../features/theme/MinimizeModeButton";
import { CloseAsideButton } from "../../features/theme/CloseAsideButton";
import { setAsideWidth } from "../../features/theme/themeSlice";

export const Aside: FC = () => {
	const theme = useAppSelector((state: RootState) => state.theme);
	const dispatch = useAppDispatch();
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		dispatch(setAsideWidth(asideRef.current?.offsetWidth));
	}, [theme.isMinimizeMode, dispatch]);

	return (
		<aside
			ref={asideRef}
			className={`aside shadow-lg ${theme.isMobileMode ? "mobile" : ""} ${
				theme.isAsideOpen ? "open" : "close"
			} ${theme.isMinimizeMode ? "minimize" : ""} ${theme.isDarkTheme ? "bg-dark" : "bg-white"}`}>
			<div className='aside-header'>
				<MobileModeButton />
				{theme.isMobileMode ? <CloseAsideButton /> : <MinimizeModeButton />}
			</div>
			<div className='aside-body'>
				<AsideNav menu={homeMenu} />
			</div>
			<div className='aside-footer'>
				<SignOutButton className='w-100 shadow' />
			</div>
		</aside>
	);
};
