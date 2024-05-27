import Input from "../components/Form/Input/Input";
import Button from "../components/elements/Button/Button";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/elements/Card/Card";
import { authMenu, homeMenu } from "../menu";
import useFormValidation from "../features/validation/useFormValidation";
import {
	isSigninEmailValidFn,
	isSigninPasswordValidFn,
} from "../features/validation/validationUtils";
import { useNavigate } from "react-router-dom";
import { useToast } from "../features/notification/useToast";
import { useSigninMutation } from "../features/auth/authApi";
import { useAppDispatch } from "../store/hooks";
import { setUserInfo } from "../features/user/userSlice";
import { CenteredPage } from "../components/layout/CenteredPage";

const EMAIL = "email";
const PASSWORD = "password";

const SignIn = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [reqSignin, { isLoading }] = useSigninMutation();
	const { validationObj, setValidationObj, getValidationObj, handleSubmit } = useFormValidation({
		[EMAIL]: {
			defaultValue: "",
			validCheckFnList: isSigninEmailValidFn,
		},
		[PASSWORD]: {
			defaultValue: "",
			validCheckFnList: isSigninPasswordValidFn,
		},
	});

	const handleSignin = () => {
		const reqData: any = {};
		for (const key in validationObj) {
			reqData[key] = validationObj[key].value;
		}

		reqSignin(reqData)
			.unwrap()
			.then((resData) => {
				if (!resData.ok) {
					toast.add("Sign In failed", resData.message, "danger");
					return;
				}

				dispatch(setUserInfo(resData.data));
				navigate(homeMenu.dashboard.path);
				toast.add("Sign In Succeeded", "You have successfully logged in!", "success");
			})
			.catch((error) => {
				if (error.status === 401) {
					toast.add("Sign In failed", "Signin failed. Invalid username or password.", "danger");
					setValidationObj((prevObj) => {
						const newObj = { ...prevObj };
						newObj[PASSWORD].value = "";
						return newObj;
					});
				} else {
					toast.add("Sign In failed", error.data.meassage, "danger");
				}
			});
	};

	return (
		<CenteredPage title={authMenu.signin.title}>
			<Card className='p-5 bg-backdrop border border-1'>
				<CardHeader className='justify-content-center'>
					<CardTitle tag='h1' className='fw-bold'>
						Sign In
					</CardTitle>
				</CardHeader>
				<CardBody>
					<form onSubmit={(event) => handleSubmit(event, handleSignin)}>
						<div className='d-flex flex-column gap-3'>
							<Input
								type='email'
								label='Email'
								{...getValidationObj(validationObj?.[EMAIL], false)}
							/>
							<Input
								type='password'
								label='Password'
								{...getValidationObj(validationObj?.[PASSWORD], false)}
							/>
							<div className='mt-3 d-flex justify-content-center'>
								<Button className='w-50 bg-primary' type='submit' disabled={isLoading}>
									Sign In
								</Button>
							</div>
						</div>
					</form>
				</CardBody>
				<CardFooter className='justify-content-between'>
					<Button
						type='button'
						onClick={() => {
							navigate(authMenu.signup.path);
						}}>
						Don't have an account?
					</Button>
					{/* <Button className='p-1' type='button' onClick={() => {}}>
						Forgot password?
					</Button> */}
				</CardFooter>
			</Card>
		</CenteredPage>
	);
};

export default SignIn;
