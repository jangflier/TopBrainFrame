import { FC, HTMLAttributes } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "../../models/globalTypes";

interface AsideNavProps extends HTMLAttributes<HTMLElement> {
	menu: Menu;
}

export const AsideNav: FC<AsideNavProps> = ({ menu }) => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<nav className='aside-nav' aria-label='Navigation'>
			<ul>
				{Object.keys(menu).map((key, index) => {
					const menuItem = menu[key];

					return (
						<li
							key={`${key}-${index}`}
							className={location.pathname === menuItem.path ? "active" : ""}
							onClick={() => navigate(menuItem.path)}>
							{menuItem.title}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
