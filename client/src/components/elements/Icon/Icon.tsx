import { FC, HtmlHTMLAttributes } from "react";
import { BootstrapColor } from "../../../models/globalTypes";
import "bootstrap-icons/font/bootstrap-icons.css";

export interface IconTypes extends HtmlHTMLAttributes<HTMLElement> {
	icon: string; // Refer to the Bootstrap Icons website for icon names: https://icons.getbootstrap.com/
	color?: BootstrapColor;
}

export const Icon: FC<IconTypes> = ({ className, icon, color, ...props }) => {
	return (
		<i
			className={`bi bi-${icon} ${color && `text-${color}`} ${
				props.onClick && "cursor-pointer"
			} ${className}`}
			{...props}></i>
	);
};
