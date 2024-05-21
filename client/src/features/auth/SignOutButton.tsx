import { FC, HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/elements/Button/Button";
import { useToast } from "../notification/useToast";
import { useSignoutMutation } from "./authApi";
import { useAppDispatch } from "../../store/hooks";
import { clearUserInfo } from "../user/userSlice";
import { authMenu } from "../../menu";

interface SignOutButtonProps extends HTMLAttributes<HTMLElement> {}

export const SignOutButton: FC<SignOutButtonProps> = ({ className = "" }) => {
	const navigate = useNavigate();
	const toast = useToast();
	const [reqSignout] = useSignoutMutation();
	const dispatch = useAppDispatch();

	const handleSignout = () => {
		reqSignout()
			.unwrap()
			.then((resData) => {
				if (!resData.ok) {
					toast.add(
						"Sign Out Failed",
						"We encountered an issue while attempting to sign you out.",
						"danger",
					);
					return;
				}
				dispatch(clearUserInfo());
				navigate(authMenu.signin.path);
				toast.add("Sign Out Successful", "You have been successfully signed out.", "success");
			})
			.catch((error) => {
				if (error.status === 401) {
					dispatch(clearUserInfo());
					navigate(authMenu.signin.path);
					toast.add("Sign Out Successful", "You have been successfully signed out.", "success");
					return;
				}
				toast.add(
					"Sign Out Failed",
					"We encountered an issue while attempting to sign you out.",
					"danger",
				);
			});
	};

	return (
		<Button className={`${className}`} onClick={handleSignout}>
			Sign Out
		</Button>
	);
};
