import { OpenAsideButton } from "../../features/theme/OpenAsideButton";
import { themeType, useTheme } from "../../features/theme/useTheme";
import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import useLocalStorage from "../../utils/useLocalStorage";
import { Dropdown, DropdownItem } from "../elements/Dropdown/Dropdown";
import { Icon, IconTypes } from "../elements/Icon/Icon";

const getIcon = (icon: IconTypes["icon"]) => {
	switch (icon) {
		case "light":
			return "sun-fill";
		case "dark":
			return "moon-stars-fill";
		case "system":
			return "gear-fill";
		default:
			return "gear-fill";
	}
};

export const Header = () => {
	const isMobileMode = useAppSelector((state: RootState) => state.theme.isMobileMode);
	const [storedTheme, setStoredTheme] = useLocalStorage("theme");
	const { setTheme } = useTheme();
	const themeType: Array<themeType> = ["light", "dark", "system"];
	const icon = getIcon(storedTheme || "");

	return (
		<header className='header shadow'>
			<div>{isMobileMode && <OpenAsideButton />}</div>
			<div>
				<Dropdown buttonTitle={<Icon icon={icon} />} menuPosition='position-absolute top-100 end-0'>
					{themeType.map((themeItem, index) => {
						return (
							<DropdownItem
								key={`theme-${index}`}
								className={`${themeItem === storedTheme ? "active" : ""}`}
								icon={getIcon(themeItem)}
								onClick={() => {
									setTheme(themeItem);
									setStoredTheme(themeItem);
								}}>
								{themeItem.toUpperCase()}
							</DropdownItem>
						);
					})}
				</Dropdown>
			</div>
		</header>
	);
};
