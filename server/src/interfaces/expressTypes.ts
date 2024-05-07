import { Request, Response, NextFunction } from "express";

export type ExpressRouteHandler<T = void> = (req: Request, res: Response, next: NextFunction) => T;
