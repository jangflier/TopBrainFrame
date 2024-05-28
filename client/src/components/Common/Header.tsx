import { useEffect } from "react";
import { themeType, useTheme } from "../../features/theme/useTheme";
import useLocalStorage from "../../utils/useLocalStorage";
import { Dropdown, DropdownItem } from "../elements/Dropdown/Dropdown";

export const Header = () => {
	const [storedTheme, setStoredTheme] = useLocalStorage("theme");
	const { setTheme } = useTheme();
	const themeType: Array<themeType> = ["light", "dark", "system"];

	useEffect(() => {
		console.log(storedTheme);
	}, [storedTheme]);

	return (
		<header className='header shadow d-flex justify-content-end'>
			<Dropdown title={storedTheme?.toUpperCase() || "SYSTEM"}>
				{themeType.map((themeItem, index) => (
					<DropdownItem
						key={`theme-${index}`}
						className={themeItem === storedTheme ? "active" : ""}
						onClick={() => {
							setTheme(themeItem);
							setStoredTheme(themeItem);
						}}>
						{themeItem.toUpperCase()}
					</DropdownItem>
				))}
			</Dropdown>
		</header>
	);
};
