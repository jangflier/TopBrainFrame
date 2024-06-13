import {
	FC,
	forwardRef,
	useState,
	useImperativeHandle,
	useEffect,
	useCallback,
	useRef,
	RefObject,
	createRef,
} from "react";
import { Portal } from "../../components/layout/Portal";
import { Progress, ProgressRefHandle } from "../../components/elements/Progress/Progress";
import {
	ToastBodyType,
	ToastChildrenProps,
	ToastHeaderType,
	ToastIdType,
	ToastPropsWithId,
	ToastSettingsType,
	ToastWrapperType,
	ToastsRefHandle,
} from "./ToastsTypes";
import { Icon } from "../../components/elements/Icon/Icon";

const ToastHeader: FC<ToastHeaderType & { onClose: Function }> = (props) => {
	return (
		<div className='toast-header'>
			{props.option.icon && props.option.iconColor && (
				<Icon icon={props.option.icon} color={props.option.iconColor} />
			)}
			<strong className='me-auto'>{props.content}</strong>
			{props.option.time && <small>{props.option.time.toDateString()}</small>}
			<button
				type='button'
				className='btn-close'
				data-bs-dismiss='toast'
				aria-label='Close'
				onClick={() => props.onClose()}
			/>
		</div>
	);
};

const ToastBody: FC<ToastBodyType> = (props) => {
	return (
		<div className='toast-body' {...props.option}>
			{props.content}
		</div>
	);
};

let toastTransitionDelay: number = 0;

export const ToastContainer: FC<ToastChildrenProps> = ({ children }) => {
	useEffect(() => {
		const rootStyle = getComputedStyle(document.documentElement);
		const transitionDelay = rootStyle
			.getPropertyValue("--toast-transition-delay")
			.trim()
			.replace("ms", "");
		toastTransitionDelay = parseInt(transitionDelay);
	}, []);

	return (
		<div className='toast-container position-fixed top-0 end-0 p-3' style={{ zIndex: 9999 }}>
			{children}
		</div>
	);
};

export const Toast: FC<ToastWrapperType> = ({
	children,
	className = "",
	animation = "",
	...props
}) => {
	return (
		<div
			id='toast'
			className={`toast show ${animation} ${className}`}
			role='alert'
			aria-live='assertive'
			aria-atomic='true'
			{...props}>
			{children}
		</div>
	);
};

export const Toasts = forwardRef<ToastsRefHandle, ToastSettingsType>((props, ref) => {
	const [toasts, setToasts] = useState<Array<ToastPropsWithId>>([]);
	const progressRefs = useRef<{ [key: ToastIdType]: RefObject<ProgressRefHandle> }>({});

	useImperativeHandle(ref, () => ({
		add: addToast,
		remove: removeToast,
	}));

	const removeToast = useCallback((id: ToastIdType) => {
		setToasts((toast) => {
			return toast.map((t) => {
				if (t.id === id) {
					setTimeout(() => {
						setToasts((toast) => toast.filter((t) => t.id !== id));
						delete progressRefs.current[id];
					}, toastTransitionDelay);
					return {
						...t,
						toastWrapperOption: { ...t.toastWrapperOption, animation: "toast-exit" },
					};
				} else {
					return t;
				}
			});
		});
	}, []);

	const addToast = useCallback(
		(toastPropsWithId: ToastPropsWithId) => {
			setToasts((toast) => {
				const newToast = {
					...toastPropsWithId,
					toastWrapperOption: { ...toastPropsWithId.toastWrapperOption, animation: "toast-enter" },
				};

				const t = [newToast, ...toast];

				if (props.toastsDisplayLimit && props.toastsDisplayLimit < t.length) t.pop();

				return t;
			});
		},
		[props.toastsDisplayLimit],
	);

	return (
		<Portal id='toast-container'>
			<ToastContainer>
				{toasts.map((toast) => {
					let progRef = progressRefs.current[toast.id] || createRef<ProgressRefHandle>();

					return (
						<Toast
							key={toast.id}
							animation={toast.toastWrapperOption?.animation}
							onMouseEnter={() => progRef.current?.pauseAnimation()}
							onMouseLeave={() => progRef.current?.resumeAnimation()}
							onAnimationEnd={() => progRef.current?.resumeAnimation()}>
							<ToastHeader {...toast.header} onClose={() => removeToast(toast.id)} />
							<ToastBody {...toast.body} />
							{props.toastAutoDismissDelay && (
								<Progress
									ref={progRef}
									className='rounded-pill'
									duration={props.toastAutoDismissDelay}
									onCompletion={() => removeToast(toast.id)}
									color={toast.toastWrapperOption?.progressColor}
									height={"3px"}
								/>
							)}
						</Toast>
					);
				})}
			</ToastContainer>
		</Portal>
	);
});
