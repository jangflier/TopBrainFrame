import Button from "../../components/elements/Button/Button";
import { useAppDispatch } from "../../store/hooks";
import { setAsideOpen } from "./themeSlice";

export const OpenAsideButton = () => {
	const dispatch = useAppDispatch();

	const openAside = () => {
		dispatch(setAsideOpen(true));
	};

	return <Button onClick={openAside}>open</Button>;
};
