import { FC } from "react";
import Button from "../../components/elements/Button/Button";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setMobileMode } from "./themeSlice";

export const MobileModeButton: FC = () => {
	const isMobileMode = useAppSelector((state: RootState) => state.theme.isMobileMode);
	const dispatch = useAppDispatch();

	const toggleMobileMode = () => {
		dispatch(setMobileMode(!isMobileMode));
	};

	return (
		<Button
			icon={isMobileMode ? "pc-display-horizontal" : "phone-fill"}
			className='p-0 fs-4'
			onClick={toggleMobileMode}></Button>
	);
};
