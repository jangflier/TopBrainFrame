import { FC, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, type = "button", className = "", ...props }) => {
	return (
		<button type={type} className={`btn ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
