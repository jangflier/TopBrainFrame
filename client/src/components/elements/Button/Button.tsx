import { FC, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, className = "", ...props }) => {
	return (
		<button className={`btn p-1 rounded-start-pill rounded-end-pill ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
