import { useEffect, useRef } from "react";
import { ValidationProps } from "./validationTypes";

const ValidationFeedback: React.FC<ValidationProps> = ({
	wasTouched,
	invalidFeedback,
	validFeedback,
	isTooltip,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isTooltip && ref.current?.parentNode) {
			const P = ref.current.parentNode as HTMLElement;

			for (let i = 0; i < P.classList?.length; i += 1) {
				if (["input-group"].includes(P.classList[i]) && P.parentNode) {
					const PP = P.parentNode as HTMLElement;
					PP.classList.add("position-relative");
				} else {
					P.classList.add("position-relative");
				}
			}
		}
	});

	if (wasTouched && invalidFeedback) {
		return (
			<div ref={ref} className={isTooltip ? "invalid-tooltip" : "invalid-feedback"}>
				{invalidFeedback}
			</div>
		);
	}
	if (wasTouched && !invalidFeedback && validFeedback) {
		return (
			<div ref={ref} className={isTooltip ? "valid-feedback" : "valid-tooltip"}>
				{validFeedback}
			</div>
		);
	}

	return null;
};

export default ValidationFeedback;
