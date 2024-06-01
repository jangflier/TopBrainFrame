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

	return <Button onClick={toggleMinimize}>Minimize</Button>;
};
