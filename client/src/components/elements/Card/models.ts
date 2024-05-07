import { HTMLAttributes } from "react";

export type CardCommonProps = HTMLAttributes<HTMLElement>;

export type CardTitleProps = CardCommonProps & {
	tag?: "h1" | "h2" | "h3" | "h4" | "h5";
};

export type CardHeaderLeftProps = CardCommonProps;

export type CardHeaderRightProps = CardCommonProps;

export type CardHeaderProps = CardCommonProps;

export type CardBodyProps = CardCommonProps;

export type CardFooterLeftProps = CardCommonProps;

export type CardFooterRightProps = CardCommonProps;

export type CardFooterProps = CardCommonProps;

export type CardProps = CardCommonProps;
