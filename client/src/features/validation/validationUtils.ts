import { InputHTMLAttributes } from "react";
import {
	ValidationItems,
	ValidationReturnObject,
	ValidationInitValuesItems,
} from "./validationTypes";

const applyValidateFucntion =
	(checkIsNotValidFn: Function, ...funcOtherValues: Array<any>) =>
	(invalidFeedback: string, validFeedback?: string) =>
	(
		inputValue: InputHTMLAttributes<HTMLInputElement>["value"],
		compareTargetValue: InputHTMLAttributes<HTMLInputElement>["value"],
	): ValidationReturnObject => {
		if (checkIsNotValidFn(...funcOtherValues, inputValue, compareTargetValue)) {
			return {
				isValid: true,
				message: validFeedback,
			};
		}
		return {
			isValid: false,
			message: invalidFeedback,
		};
	};

export const isValidForm = (
	validCheckFnList: ValidationItems["validCheckFnList"],
	inputValue: ValidationItems["value"],
	compareTargetValue: ValidationItems["value"],
): ValidationReturnObject => {
	const fiteredInvalidObj = validCheckFnList
		.map((fn) => fn(inputValue, compareTargetValue))
		.find((checkedValidList) => checkedValidList.isValid === false);

	return fiteredInvalidObj || { isValid: true };
};

export const isValidEmailStandardFormat = (str: string): boolean => {
	return /^[a-zA-Z0-9-+_.]+@[a-zA-Z0-9-]+\.\w{2,}$/.test(str);
};

export const isValidPasswordStandardFormat = (str: string): boolean => {
	return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/.test(str);
};

export const isNotEmptyString = (str: string): boolean => {
	return !(str.replaceAll(" ", "") === "");
};

export const isNotIncludesSpecialChar = (str: string): boolean => {
	return !/[^a-zA-Z0-9]/g.test(str);
};

export const isValidStringLength = (
	strMinLength: number,
	strMaxLength: number,
	str: string,
): boolean => {
	return str.length >= strMinLength && str.length <= strMaxLength;
};

export const isPasswordMatch = (confirmPassword: string, password: string): boolean => {
	return confirmPassword === password;
};

export const isSigninEmailValidFn = [
	applyValidateFucntion(isNotEmptyString)("Please enter your email address"),
	applyValidateFucntion(isValidEmailStandardFormat)("Please enter a valid email address"),
];

export const isSigninPasswordValidFn = [
	applyValidateFucntion(isNotEmptyString)("Please enter your Password"),
];

export const isValidNameFn = (
	isFirstName: boolean,
): ValidationInitValuesItems["validCheckFnList"] => [
	applyValidateFucntion(isNotEmptyString)(
		`Please enter your ${isFirstName ? "First" : "Last"} name`,
	),
	applyValidateFucntion(
		isValidStringLength,
		2,
		50,
	)("The name length must be between 2 and 50 characters"),
	applyValidateFucntion(isNotIncludesSpecialChar)("Special characters are not allowed in the name"),
];

export const isValidEmailFn = [
	applyValidateFucntion(isNotEmptyString)("Please enter your email address"),
	applyValidateFucntion(
		isValidStringLength,
		2,
		30,
	)("The email length must be between 2 and 50 characters"),
	applyValidateFucntion(isValidEmailStandardFormat)("Please enter a valid email address"),
];

export const isValidPasswordFn = [
	applyValidateFucntion(isNotEmptyString)("Please enter your password"),
	applyValidateFucntion(
		isValidStringLength,
		8,
		64,
	)("The password length must be between 8 and 64 characters"),
	applyValidateFucntion(isValidPasswordStandardFormat)(
		"Your password must include at least one letter, one number, and one special character",
	),
];

export const isValidConfirmPasswordFn = [
	...isValidPasswordFn,
	applyValidateFucntion(isPasswordMatch)("The password and confirmation password do not match"),
];
