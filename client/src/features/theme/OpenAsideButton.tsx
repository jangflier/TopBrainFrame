import Button from "../../components/elements/Button/Button";
import { useAppDispatch } from "../../store/hooks";
import { setAsideOpen } from "./themeSlice";

export const OpenAsideButton = () => {
	const dispatch = useAppDispatch();

	const openAside = () => {
		dispatch(setAsideOpen(true));
	};

	return <Button icon='box-arrow-in-right' className='p-0 fs-4' onClick={openAside}></Button>;
};
