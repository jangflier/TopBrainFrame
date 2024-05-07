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
			<input
				ref={ref}
				className={`form-control px-3 py-1 border-1 border-gray rounded-start-pill rounded-end-pill ${
					showValidationFeedback && validClass()
				} ${className}`}
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
