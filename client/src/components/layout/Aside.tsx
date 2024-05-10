import { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";

export const Aside: FC = () => {
	const isAsideOpen = useAppSelector((state: RootState) => state.theme.isAsideOpen);

	return <aside className={`aside ${isAsideOpen ? "open" : ""}`}>aside</aside>;
};
