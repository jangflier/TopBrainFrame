import Button from "../../components/elements/Button/Button";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setMinimizeMode } from "./themeSlice";

export const MinimizeModeButton = () => {
	const isMinimizeMode = useAppSelector((state: RootState) => state.theme.isMinimizeMode);
	const dispatch = useAppDispatch();

	const toggleMinimize = () => {
		dispatch(setMinimizeMode(!isMinimizeMode));
	};

	return (
		<Button
			icon={isMinimizeMode ? "indent" : "unindent"}
			className='p-0 fs-4'
			onClick={toggleMinimize}></Button>
	);
};
