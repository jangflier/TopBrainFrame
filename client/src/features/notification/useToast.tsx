import { useContext, useMemo } from "react";
import ToastsContext from "./ToastsContext";
import { AlertTypes, ToastIdType, ToastProps, ToastPropsWithId } from "./ToastsTypes";

let toastId: ToastIdType = 1;

export const useToast = () => {
	const ctx = useContext(ToastsContext);
	if (ctx === undefined) {
		throw Error("`useToasts` must be used inside of a `ToastsProvider`");
	}

	const toast = useMemo(() => {
		const add = (
			title: ToastProps["header"]["content"],
			message: ToastProps["body"]["content"],
			alertType: AlertTypes,
		): ToastIdType => {
			const id = toastId++;
			let icon = undefined;
			let iconColor = alertType;

			switch (alertType) {
				case "success":
					icon = "check-circle";
					break;
				case "warning":
					icon = "exclamation-circle";
					break;
				case "danger":
					icon = "x-circle";
					break;
				case "info":
					icon = "x-circle";
					break;
			}

			const newToastProps: ToastPropsWithId = {
				header: {
					content: title,
					option: icon
						? {
								icon,
								iconColor,
						  }
						: {},
				},
				body: {
					content: message,
				},
				toastWrapperOption: {
					progressColor: alertType,
				},
				id,
			};

			ctx.current?.add(newToastProps);

			return id;
		};

		const remove = (id: ToastIdType) => {
			ctx.current?.remove(id);
		};

		return {
			add,
			remove,
		};
	}, [ctx]);

	return toast;
};
