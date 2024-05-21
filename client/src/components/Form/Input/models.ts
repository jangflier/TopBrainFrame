import { InputHTMLAttributes } from "react";
import { ExcludeType } from "../../../models/globalUtilsTypes";
import { ValidationItems, ValidationProps } from "../../../features/validation/validationTypes";

export interface CustomInputProps extends ValidationProps {
	isValid: boolean;
	isValidMessage: boolean;
	showValidationFeedback: boolean;
	value: ValidationItems["value"];
	label: string;
}

export type InputProps = Partial<CustomInputProps> &
	ExcludeType<InputHTMLAttributes<HTMLInputElement>, "type", "select" | "checkbox" | "radio">;
