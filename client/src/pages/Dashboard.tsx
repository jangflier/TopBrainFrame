import { useNavigate } from "react-router-dom";
import Button from "../components/elements/Button/Button";
import { Page } from "../components/layout/Page";
import { useSignoutMutation } from "../features/auth/authApi";
import { useToast } from "../features/notification/useToast";
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authMenu } from "../menu";
import { clearUserInfo } from "../features/user/userSlice";

const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const userInfo = useAppSelector((state: RootState) => state.userInfo);
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
		<Page>
			<div>
				<h1>Wellcome to my project {userInfo.firstName}!</h1>
				<div>Email : {userInfo.email}</div>
				<div>
					Created Date : {userInfo.createdAt && new Date(userInfo.createdAt).toLocaleDateString()}
				</div>
			</div>
			<Button className='bg-secondary' onClick={handleSignout}>
				Sign Out
			</Button>
		</Page>
	);
};

export default Dashboard;
