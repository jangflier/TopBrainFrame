import { ExpressRouteHandler } from "../interfaces/expressTypes";
import { sendError } from "../util/responseHelpers";

export const checkSession: ExpressRouteHandler = async (req, res, next) => {
	if (req.session.userId) {
		next();
	} else {
		res.clearCookie("connect.sid", { path: "/" });
		sendError(res, 401, "Unauthorized: No session available, Please signin.");
	}
};
