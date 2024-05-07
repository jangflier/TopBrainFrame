import { HTMLAttributes, ReactNode } from "react";
import { BootstrapColor } from "../../models/globalTypes";

export interface ToastChildrenProps {
	children?: ReactNode;
}

export interface ToastWrapperType extends HTMLAttributes<HTMLElement> {
	animation?: string;
	progressColor?: BootstrapColor;
}

type BootstrapIcon = string;

export interface ToastHeaderType {
	content: ReactNode;
	option?: HTMLAttributes<HTMLElement> & {
		icon?: BootstrapIcon;
		iconColor?: BootstrapColor;
		time?: Date;
	};
}

export interface ToastBodyType {
	content: ReactNode;
	option?: HTMLAttributes<HTMLElement>;
}

export interface ToastProps {
	toastWrapperOption?: ToastWrapperType | null;
	header: ToastHeaderType;
	body: ToastBodyType;
}

export type ToastIdType = number;

export type ToastPropsWithId = ToastProps & { id: ToastIdType };

export interface ToastSettingsType {
	toastsDisplayLimit: number;
	toastAutoDismissDelay: number;
}

export interface ToastsRefHandle {
	add: (ToastProps: ToastPropsWithId) => void;
	remove: (id: ToastIdType) => void;
}
