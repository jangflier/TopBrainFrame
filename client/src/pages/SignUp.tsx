import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Form/Input/Input";
import Button from "../components/elements/Button/Button";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/elements/Card/Card";
import { authMenu } from "../menu";
import {
	isValidConfirmPasswordFn,
	isValidEmailFn,
	isValidNameFn,
	isValidPasswordFn,
} from "../features/validation/validationUtils";
import { useSignupMutation } from "../features/auth/authApi";
import useFormValidation from "../features/validation/useFormValidation";
import { useToast } from "../features/notification/useToast";
import { CenteredPage } from "../components/layout/CenteredPage";

const FIRST_NAME = "firstName";
const LAST_NAME = "lastName";
const EMAIL = "email";
const PASSWORD = "password";
const CONFIRM_PASSWORD = "confirmPassword";

const SignUp: React.FC = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const [reqSignUp, { isLoading }] = useSignupMutation();
	const { validationObj, setValidationObj, getValidationObj, handleSubmit } = useFormValidation({
		[FIRST_NAME]: {
			defaultValue: "",
			validCheckFnList: isValidNameFn(true),
		},
		[LAST_NAME]: {
			defaultValue: "",
			validCheckFnList: isValidNameFn(false),
		},
		[EMAIL]: {
			defaultValue: "",
			validCheckFnList: isValidEmailFn,
		},
		[PASSWORD]: {
			defaultValue: "",
			validCheckFnList: isValidPasswordFn,
		},
		[CONFIRM_PASSWORD]: {
			defaultValue: "",
			compareTargetID: PASSWORD,
			validCheckFnList: isValidConfirmPasswordFn,
		},
	});
	const emailRef = useRef<HTMLInputElement>(null);

	const handleSignup = () => {
		const data: any = {};
		for (const key in validationObj) {
			data[key] = validationObj[key].value;
		}

		reqSignUp(data)
			.unwrap()
			.then((resData) => {
				if (!resData.ok) {
					toast.add("Sign Up Failed", resData.message, "danger");
					return;
				}

				navigate(authMenu.signin.path);
				toast.add(
					"SignUp Succeeded",
					"Congratulations, You have successfully registered!",
					"success",
				);
			})
			.catch((error) => {
				if (error.status === 409) {
					const message = error.data.message;
					setValidationObj((prevObj) => ({
						...prevObj,
						[EMAIL]: {
							...prevObj[EMAIL],
							isValid: {
								isValid: false,
								message,
							},
						},
					}));
					if (emailRef.current) {
						emailRef.current.focus();
					}
					toast.add("Duplicate Email", message, "warning");
				} else toast.add("Sign Up Failed", error.data.meassage, "danger");
			});
	};

	return (
		<CenteredPage title={authMenu.signup.title}>
			<Card className='p-5 bg-backdrop border border-1'>
				<CardHeader className='justify-content-center'>
					<CardTitle tag='h1' className='fw-bold'>
						Sign Up
					</CardTitle>
				</CardHeader>
				<CardBody>
					<form onSubmit={(event) => handleSubmit(event, handleSignup)}>
						<div className='d-flex flex-column gap-3'>
							<div className='d-flex flex-column flex-md-row gap-3'>
								<Input
									type='text'
									label='First Name'
									{...getValidationObj(validationObj?.[FIRST_NAME])}
								/>
								<Input
									type='text'
									label='Last Name'
									{...getValidationObj(validationObj?.[LAST_NAME])}
								/>
							</div>
							<Input
								ref={emailRef}
								type='email'
								label='Email'
								{...getValidationObj(validationObj?.[EMAIL])}
							/>
							<Input
								type='password'
								label='Password'
								{...getValidationObj(validationObj?.[PASSWORD])}
							/>
							<Input
								type='password'
								label='Confirm Password'
								{...getValidationObj(validationObj?.[CONFIRM_PASSWORD])}
							/>
							<div className='mt-3 d-flex justify-content-center'>
								<Button className='w-50 bg-primary' type='submit' disabled={isLoading}>
									Sign Up
								</Button>
							</div>
						</div>
					</form>
				</CardBody>
				<CardFooter className='justify-content-between'>
					<Button
						className='p-1'
						type='button'
						onClick={() => {
							navigate(authMenu.signin.path);
						}}>
						Already have an account?
					</Button>
				</CardFooter>
			</Card>
		</CenteredPage>
	);
};

export default SignUp;
