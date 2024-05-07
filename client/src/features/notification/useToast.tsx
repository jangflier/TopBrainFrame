import { useContext, useMemo } from "react";
import ToastsContext from "./ToastsContext";
import { BootstrapColor } from "../../models/globalTypes";
import { ToastIdType, ToastProps, ToastPropsWithId } from "./ToastsTypes";

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
			alertType: BootstrapColor,
		): ToastIdType => {
			const id = toastId++;
			const newToastProps: ToastPropsWithId = {
				header: {
					content: title,
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
