import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import Button from "../Button/Button";

type DropdownCommonProps = HTMLAttributes<HTMLElement>;

export interface DropdownProps extends DropdownCommonProps {
	title: string;
}

export interface DropdownItemProps extends DropdownCommonProps {}

export const DropdownItem: FC<DropdownCommonProps> = ({ className = "", children, ...props }) => {
	return (
		<li className={`dropdown-item cursor-pointer ${className}`} {...props}>
			{children}
		</li>
	);
};

export const Dropdown: FC<DropdownCommonProps> = ({ title, children, ...props }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

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
		<div ref={dropdownRef} className='dropdown' {...props}>
			<Button
				className='btn-secondary dropdown-toggle mb-1'
				type='button'
				onClick={toggleDropdown}
				aria-expanded={isOpen}>
				{title}
			</Button>
			{isOpen && <ul className='dropdown-menu show'>{children}</ul>}
		</div>
	);
};
