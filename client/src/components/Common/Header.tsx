import { OpenAsideButton } from "../../features/theme/OpenAsideButton";
import { themeType, useTheme } from "../../features/theme/useTheme";
import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import useLocalStorage from "../../utils/useLocalStorage";
import { Dropdown, DropdownItem } from "../elements/Dropdown/Dropdown";

export const Header = () => {
	const isMobileMode = useAppSelector((state: RootState) => state.theme.isMobileMode);
	const [storedTheme, setStoredTheme] = useLocalStorage("theme");
	const { setTheme } = useTheme();
	const themeType: Array<themeType> = ["light", "dark", "system"];

	return (
		<header className='header shadow'>
			<div>{isMobileMode && <OpenAsideButton />}</div>
			<div>
				<Dropdown
					title={storedTheme?.toUpperCase() || "SYSTEM"}
					menuPosition='position-absolute top-100 end-0'>
					{themeType.map((themeItem, index) => (
						<DropdownItem
							key={`theme-${index}`}
							className={`${themeItem === storedTheme ? "active" : ""}`}
							onClick={() => {
								setTheme(themeItem);
								setStoredTheme(themeItem);
							}}>
							{themeItem.toUpperCase()}
						</DropdownItem>
					))}
				</Dropdown>
			</div>
		</header>
	);
};
