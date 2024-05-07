import { InputHTMLAttributes } from "react";
import { IncludeType } from "../../../models/globalUtilsTypes";

export type ChecksProps = IncludeType<
	InputHTMLAttributes<HTMLInputElement>,
	"type",
	"checkbox" | "radio"
> & {
	label: string;
};
