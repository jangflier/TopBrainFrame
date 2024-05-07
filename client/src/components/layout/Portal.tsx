import ReactDOM from "react-dom";
import { FC, PropsWithChildren } from "react";

interface PortalProps extends PropsWithChildren {
	id: string;
}

export const Portal: FC<PortalProps> = ({ children, id }) => {
	const mount = document.getElementById(id);
	return mount ? ReactDOM.createPortal(children, mount) : <></>;
};
