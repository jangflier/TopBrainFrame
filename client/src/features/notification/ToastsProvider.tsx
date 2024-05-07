import { ReactNode, useRef } from "react";
import ToastsContext from "./ToastsContext";
import { Toasts } from "./Toasts";
import { ToastsRefHandle } from "./ToastsTypes";

export const ToastsProvider = ({ children }: { children: ReactNode }) => {
	const toastsRef = useRef<ToastsRefHandle>(null);

	return (
		<ToastsContext.Provider value={toastsRef}>
			{children}
			<Toasts ref={toastsRef} toastsDisplayLimit={10} toastAutoDismissDelay={3000} />
		</ToastsContext.Provider>
	);
};
