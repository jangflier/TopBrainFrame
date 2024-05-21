import { ExpressRouteHandler } from "../interfaces/expressTypes";
import { UserNotFoundError } from "../errors/AuthenticationErrors";
import { sendError, sendSuccess } from "../util/responseHelpers";
import { User } from "../models/user";

export const userInfo: ExpressRouteHandler = async (req, res) => {
	try {
		const userInfo = await User.findByPk(req.session.userId);
		if (!userInfo) throw new UserNotFoundError();

		sendSuccess(res, "Session verified", userInfo);
	} catch (error) {
		if (error instanceof UserNotFoundError) {
			return req.session.destroy((sessionError) => {
				if (sessionError) {
					console.error(sessionError);
					sendError(res, 500, "Failed to destroy session.");
				}
				res.clearCookie("connect.sid", { path: "/" });
				sendError(res, 404, "User Not Found");
			});
		}
		console.error(error);
		sendError(res, 500, "Internal Server Error");
	}
};
