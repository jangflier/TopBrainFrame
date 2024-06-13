import Button from "../../components/elements/Button/Button";
import { useAppDispatch } from "../../store/hooks";
import { setAsideOpen } from "./themeSlice";

export const CloseAsideButton = () => {
	const dispatch = useAppDispatch();

	const closeAside = () => {
		dispatch(setAsideOpen(false));
	};

	return <Button icon='x' className='p-0 fs-4' onClick={closeAside}></Button>;
};
