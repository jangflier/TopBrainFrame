import { Response } from "express";

export const sendError = (res: Response, statusCode: number, message: string) => {
	res.status(statusCode).send({ ok: false, message });
};

export const sendSuccess = (res: Response, message: string, data?: any) => {
	const response: { ok: boolean; message: string; data?: any } = {
		ok: true,
		message,
	};

	if (data != null) {
		response.data = data;
	}

	res.status(200).send(response);
};
