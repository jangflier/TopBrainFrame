import { ExpressRouteHandler } from "../interfaces/expressTypes";

export const cors: ExpressRouteHandler = (req, res, next) => {
	next();
};
