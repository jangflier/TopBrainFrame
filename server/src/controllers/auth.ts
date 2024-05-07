import bcrypt from "bcrypt";

import { ExpressRouteHandler } from "../interfaces/expressTypes";
import { User } from "../models/user";
import textColor from "../util/consoleTextColor";
import { sendError, sendSuccess } from "../util/responseHelpers";
import { UserNotFoundError } from "../errors/AuthenticationErrors";

export const signin: ExpressRouteHandler = async (req, res) => {
	interface ReqSigninData {
		email: string;
		password: string;
	}

	const reqData: ReqSigninData = req.body;

	try {
		const userInfo = await User.scope("withHashAndSalt").findOne({
			where: {
				email: reqData.email,
			},
		});
		if (!userInfo) return sendError(res, 401, "Sign In failed. Invalid username or password.");
		const isMatched = await bcrypt.compare(reqData.password, userInfo.hash);
		if (!isMatched) return sendError(res, 401, "Sign In failed. Invalid username or password.");

		req.session.userId = userInfo.id;
		req.session.ip = req.ip;
		req.session.save((error) => {
			if (error) {
				console.error(textColor("lightred", "The session failed to save to the session store."));
				return sendError(res, 500, "Internal Server Error");
			}

			const { hash, salt, ...resData } = userInfo.dataValues;
			sendSuccess(res, "Signin Succeeded", resData);
		});
	} catch (error) {
		console.error(textColor("lightred", `Error User Email:${reqData.email}`));
		console.error(error);
		sendError(res, 500, "Internal Server Error");
	}
};

export const signup: ExpressRouteHandler = async (req, res) => {
	const reqData = req.body;

	let salt;
	let hash;

	try {
		const saltRounds = 10;
		salt = await bcrypt.genSalt(saltRounds);
		hash = await bcrypt.hash(reqData.password, salt);
	} catch (err) {
		console.error(textColor("lightred", "Salt or Hash Generate Failed"));
		console.error(err);
		return sendError(res, 500, "Internal Server Error");
	}

	try {
		await User.create({
			firstName: reqData.firstName,
			lastName: reqData.lastName,
			email: reqData.email,
			salt,
			hash,
		});
		sendSuccess(res, "Your account has been successfully created.");
	} catch (error) {
		if (error instanceof Error) {
			if (error.name === "SequelizeUniqueConstraintError") {
				return sendError(
					res,
					409,
					"This email address is already in use. Please use a different email address.",
				);
			}
		}
		console.error(error);
		sendError(res, 500, "Internal Server Error");
	}
};

export const signout: ExpressRouteHandler = (req, res) => {
	req.session.destroy((sessionError) => {
		if (sessionError) {
			console.error(sessionError);
			sendError(res, 500, "Failed to destroy session.");
		}
		res.clearCookie("connect.sid", { path: "/" });
		sendSuccess(res, "Sign Out Successful");
	});
};

export const verifySessionAndSendUserInfo: ExpressRouteHandler = async (req, res) => {
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
