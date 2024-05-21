export interface Menu {
	[key: string]: MenuItem;
}

export interface MenuItem {
	id: string;
	title: string;
	path: string;
	icon: string;
}

export type BootstrapColor =
	| "primary"
	| "secondary"
	| "success"
	| "danger"
	| "warning"
	| "info"
	| "light"
	| "dark";
