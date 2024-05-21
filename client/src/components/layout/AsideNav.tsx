import { FC, HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../models/globalTypes";

interface AsideNavProps extends HTMLAttributes<HTMLElement> {
	menu: Menu;
}

export const AsideNav: FC<AsideNavProps> = ({ menu }) => {
	const navigate = useNavigate();

	return (
		<nav className='aside-nav' aria-label='Navigation'>
			<ul>
				{Object.keys(menu).map((key, index) => {
					const menuItem = menu[key];
					return (
						<li key={`${key}-${index}`} onClick={() => navigate(menuItem.path)}>
							{menuItem.title}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
