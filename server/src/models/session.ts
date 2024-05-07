import { User } from "./user";

export interface SessionDatas {
	userId: User["id"];
	ip: string;
}
