import { InputProps } from "./models";
import { forwardRef } from "react";
import ValidationFeedback from "../../../features/validation/ValidationFeedback";

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
	{
		className = "",
		autoComplete = "off",
		isValid = false,
		isValidMessage = true,
		wasTouched = false,
		invalidFeedback = null,
		validFeedback = null,
		isTooltip = false,
		showValidationFeedback = false,
		label,
		...props
	},
	ref,
) => {
	const validClass = (): string => {
		if (!isValid && wasTouched && invalidFeedback) return "is-invalid";
		if (isValid && wasTouched && !invalidFeedback) return "is-valid";
		return "";
	};

	return (
		<div>
			{label && <div className='form-label'>{label}</div>}
			<input
				ref={ref}
				className={`form-control ${showValidationFeedback && validClass()} ${className}`}
				autoComplete={autoComplete}
				{...props}
			/>
			{isValidMessage && (
				<ValidationFeedback
					wasTouched={wasTouched}
					invalidFeedback={invalidFeedback}
					validFeedback={validFeedback}
					isTooltip={isTooltip}
				/>
			)}
		</div>
	);
};

export default forwardRef(Input);
