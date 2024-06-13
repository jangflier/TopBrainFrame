import { FC, ButtonHTMLAttributes } from "react";
import { Icon, IconTypes } from "../Icon/Icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: IconTypes["icon"];
}

const Button: FC<ButtonProps> = ({ children, className = "", type = "button", icon, ...props }) => {
	return (
		<button type={type} className={`btn ${className}`} {...props}>
			{icon && <Icon icon={icon} />}
			{children}
		</button>
	);
};

export default Button;
