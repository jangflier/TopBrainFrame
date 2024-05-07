import { FC } from "react";
import { ChecksProps } from "./models";

const Checks: FC<ChecksProps> = ({ className = "", label, ...props }) => {
	return (
		<div className='form-check'>
			<input className={`form-check-input ${className}`} {...props} />
			<label className={`form-check-label`}>{label}</label>
		</div>
	);
};

export default Checks;
