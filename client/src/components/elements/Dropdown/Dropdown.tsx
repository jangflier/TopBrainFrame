import { FC, HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { IconTypes } from "../Icon/Icon";

type DropdownCommonProps = HTMLAttributes<HTMLElement>;

export interface DropdownProps extends DropdownCommonProps {
	buttonTitle: ReactNode;
	menuPosition: string;
}

export interface DropdownItemProps extends DropdownCommonProps {
	icon?: IconTypes["icon"];
}

export const DropdownItem: FC<DropdownItemProps> = ({
	className = "",
	children,
	icon,
	...props
}) => {
	return (
		<li>
			<Button icon={icon} className={`dropdown-item ${className}`} {...props}>
				{children}
			</Button>
		</li>
	);
};

export const Dropdown: FC<DropdownProps> = ({
	className = "",
	buttonTitle,
	menuPosition = "",
	children,
	...props
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpen(!isOpen);
	const closeDropdown = () => setIsOpen(false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				closeDropdown();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && dropdownRef.current) {
			const dropdownMenu = dropdownRef.current.querySelector(".dropdown-menu") as HTMLElement;
			if (dropdownMenu) {
				const rect = dropdownMenu.getBoundingClientRect();

				if (rect.right > window.innerWidth) {
					dropdownMenu.style.right = "0";
					dropdownMenu.style.left = "auto";
				}
				if (rect.left < 0) {
					dropdownMenu.style.left = "0";
					dropdownMenu.style.right = "auto";
				}
				if (rect.bottom > window.innerHeight) {
					dropdownMenu.style.bottom = "100%";
					dropdownMenu.style.top = "auto";
				}
				if (rect.top < 0) {
					dropdownMenu.style.top = "100%";
					dropdownMenu.style.bottom = "auto";
				}
			}
		}
	}, [isOpen]);

	return (
		<div ref={dropdownRef} className={`dropdown ${className}`} {...props}>
			<Button
				className='btn-secondary dropdown-toggle'
				type='button'
				onClick={toggleDropdown}
				aria-expanded={isOpen}>
				{buttonTitle}
			</Button>
			<ul
				className={`dropdown-menu user-select-none mt-1 ${
					isOpen ? "show" : "hide"
				} ${menuPosition}`}>
				{children}
			</ul>
		</div>
	);
};
