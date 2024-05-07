import { FC } from "react";
import * as CardModel from "./models";

export const CardTitle: FC<CardModel.CardTitleProps> = ({
	tag: Tag = "h5",
	children,
	className = "",
	...props
}) => {
	return (
		<Tag className={`card-title ${className}`} {...props}>
			{children}
		</Tag>
	);
};

export const CardHeaderLeft: FC<CardModel.CardHeaderLeftProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<div className={`card-header-left ${className}`} {...props}>
			{children}
		</div>
	);
};

export const CardHeaderRight: FC<CardModel.CardHeaderRightProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<div className={`card-header-right ${className}`} {...props}>
			{children}
		</div>
	);
};

export const CardHeader: FC<CardModel.CardHeaderProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<div className={`card-header p-3 rounded-top-3 mb-1 ${className}`} {...props}>
			{children}
		</div>
	);
};

export const CardBody: FC<CardModel.CardBodyProps> = ({ children, className = "", ...props }) => {
	return (
		<div className={`card-body p-3 my-1 ${className}`} {...props}>
			{children}
		</div>
	);
};

export const CardFooterLeft: FC<CardModel.CardFooterLeftProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<div className={`card-footer-left ${className}`} {...props}>
			{children}
		</div>
	);
};

export const CardFooterRight: FC<CardModel.CardFooterRightProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<div className={`card-footer-right ${className}`} {...props}>
			{children}
		</div>
	);
};

export const CardFooter: FC<CardModel.CardFooterProps> = ({
	children,
	className = "",
	...props
}) => {
	return (
		<div className={`card-footer p-3 rounded-bottom-3 mt-1 ${className}`} {...props}>
			{children}
		</div>
	);
};

export const Card: FC<CardModel.CardProps> = ({ children, className = "", ...props }) => {
	return (
		<div className={`Card p-3 rounded-4 shadow ${className}`} {...props}>
			{children}
		</div>
	);
};
