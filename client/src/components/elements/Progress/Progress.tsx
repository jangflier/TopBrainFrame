import {
	HtmlHTMLAttributes,
	forwardRef,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { BootstrapColor } from "../../../models/globalTypes";

interface ProgressTypes extends HtmlHTMLAttributes<HTMLElement> {
	max?: number;
	value?: number;
	duration?: number;
	onCompletion?: Function;
	color?: BootstrapColor;
	height?: string;
}

export interface ProgressRefHandle {
	pauseAnimation: () => void;
	resumeAnimation: () => void;
}

export const Progress = forwardRef<ProgressRefHandle, ProgressTypes>(
	(
		{ max = 100, value = 100, height = "3px", color = "primary", duration, onCompletion, ...props },
		ref,
	) => {
		const [pValue, setPValue] = useState(value);
		const progressBarRef = useRef<HTMLDivElement>(null);

		useImperativeHandle(ref, () => ({
			pauseAnimation: () => {
				if (progressBarRef.current) progressBarRef.current.style.animationPlayState = "paused";
			},
			resumeAnimation: () => {
				if (progressBarRef.current && duration) {
					setPValue(0);
					progressBarRef.current.style.animationPlayState = "running";
				}
			},
		}));

		useLayoutEffect(() => {
			const progressBarElement = progressBarRef.current;

			if (progressBarElement && duration && onCompletion) {
				const handleTransitionEnd = () => {
					onCompletion();
				};
				progressBarElement.addEventListener("animationend", handleTransitionEnd);
				return () => {
					progressBarElement.removeEventListener("animationend", handleTransitionEnd);
				};
			}
		}, [duration, onCompletion]);

		return (
			<div
				className={`progress ${props.className}`}
				role='progressbar'
				aria-label='progress'
				aria-valuenow={pValue}
				aria-valuemin={0}
				aria-valuemax={max}
				style={{ height }}>
				<div
					ref={progressBarRef}
					className={`progress-bar bg-${color}`}
					style={{
						animation: `shrinkWidth ${duration?.toString() + "ms"} linear paused`,
					}}></div>
			</div>
		);
	},
);
