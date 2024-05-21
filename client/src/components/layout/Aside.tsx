import { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";
import Button from "../elements/Button/Button";
import { SignOutButton } from "../../features/auth/SignOutButton";
import { AsideNav } from "./AsideNav";
import { homeMenu } from "../../menu";

export const Aside: FC = () => {
	const isAsideOpen = useAppSelector((state: RootState) => state.theme.isAsideOpen);

	return (
		<aside className={`aside ${isAsideOpen ? "open" : ""}`}>
			<div className='aside-header'>
				<Button>mobile</Button>
				<Button>minimize</Button>
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
