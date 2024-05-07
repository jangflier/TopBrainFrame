import { UserInfoState } from "../user/userSlice";

export type ApiResponse<T = undefined> = T extends undefined
	? {
			ok: boolean;
			message: string;
	  }
	: {
			ok: boolean;
			message: string;
			data: T;
	  };

export interface SigninReqData {
	email: string;
	password: string;
}

export type SigninResData = ApiResponse<UserInfoState>;

export interface SignupReqData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
