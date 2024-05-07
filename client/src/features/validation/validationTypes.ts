import { InputHTMLAttributes } from "react";

export interface ValidationProps {
	wasTouched: boolean;
	isTooltip: boolean;
	invalidFeedback: string | null;
	validFeedback: string | null;
}

export interface ValidationInitValuesItems {
	defaultValue: ValidationItems["value"];
	validCheckFnList: Array<Function>;
	compareTargetID?: NonNullable<InputHTMLAttributes<HTMLInputElement>["id"]>;
}

export interface ValidationInitArrayItems {
	[inputID: string]: ValidationInitValuesItems;
}

export interface ValidationItems {
	id: NonNullable<InputHTMLAttributes<HTMLInputElement>["id"]>;
	name: NonNullable<InputHTMLAttributes<HTMLInputElement>["name"]>;
	value: InputHTMLAttributes<HTMLInputElement>["value"];
	wasTouched: ValidationProps["wasTouched"];
	isValid: ValidationReturnObject;
	validCheckFnList: Array<Function>;
	compareTargetID?: NonNullable<InputHTMLAttributes<HTMLInputElement>["id"]>;
}

export interface ValidationArrayItems {
	[inputID: string]: ValidationItems;
}

export interface ValidationReturnObject {
	isValid: boolean;
	message?: string;
}
