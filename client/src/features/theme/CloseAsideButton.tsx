import Button from "../../components/elements/Button/Button";
import { useAppDispatch } from "../../store/hooks";
import { setAsideOpen } from "./themeSlice";

export const CloseAsideButton = () => {
	const dispatch = useAppDispatch();

	const closeAside = () => {
		dispatch(setAsideOpen(false));
	};

	return <Button onClick={closeAside}>close</Button>;
};
