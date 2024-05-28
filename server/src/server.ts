import dotenv from "dotenv";
dotenv.config({
	path: process.env.NODE_ENV === "development" ? ".env.development" : ".env.production",
});
import http from "http";
import https, { ServerOptions } from "https";
import Express from "express";
import Path from "path";
import fs from "fs";
import * as session from "express-session";
declare module "express-session" {
	export interface SessionData extends SessionDatas {}
}
import expressMySqlSession from "express-mysql-session";
import cookieParser from "cookie-parser";

import srcDir from "./util/srcPath";
import { initRoutes } from "./routes";
import { sequelize } from "./models";
import textColor from "./util/consoleTextColor";
import { cors } from "./middleware/cors";
import db from "./config/db";
import { SessionDatas } from "./models/session";

export default class Server {
	public app: Express.Application;
	public httpsServerOptions: ServerOptions | undefined;

	constructor() {
		this.app = Express();
		this.setHttpsServerOptions();
		this.setMySQLSession();
		this.setConfig();
		this.setRoutes();
	}

	public start() {
		const httpsServerOptions = this.httpsServerOptions;
		const portNumber = process.env.SERVER_PORT || 5443;

		if (httpsServerOptions) {
			sequelize
				.sync()
				.then(() => {
					https.createServer(httpsServerOptions, this.app).listen(portNumber, () => {
						console.log(textColor("ligthgreen", "\nDatabase connection successful"));
						console.log(textColor("ligthgreen", `HTTPS server listening on port ${portNumber}\n`));
					});
				})
				.catch((err: Error) => console.error(err));
		} else {
			console.log(
				textColor(
					"lightyellow",
					"HTTPS server options are not provided. Starting HTTP server instead.",
				),
			);
			sequelize
				.sync()
				.then(() => {
					http.createServer(this.app).listen(portNumber, () => {
						console.log(textColor("ligthgreen", "\nDatabase connection successful"));
						console.log(textColor("ligthgreen", `HTTP server listening on port ${portNumber}\n`));
					});
				})
				.catch((err: Error) => console.error(err));
		}
	}

	private setConfig() {
		this.app.use(Express.json());
		this.app.use(Express.urlencoded({ extended: true }));
		this.app.use(Express.static(Path.resolve(srcDir, "../public")));
		if (process.env.NODE_ENV === "production") {
			this.app.use(Express.static(Path.resolve(srcDir, "../build")));
		}
	}

	private setRoutes() {
		this.setCommonMiddleware();
		initRoutes(this.app);
	}

	private setCommonMiddleware() {
		this.app.use(cors);
		this.app.use(cookieParser(process.env.COOKIE_SECRET || ""));
	}

	private setMySQLSession() {
		const MySQLStore = expressMySqlSession(session);
		const sessionStore = new MySQLStore({
			host: db.HOST,
			user: db.USER,
			password: db.PASSWORD,
			port: parseInt(db.PORT, 10),
			database: db.DB,
			createDatabaseTable: true,
			checkExpirationInterval: 1 * 60 * 1000,
		});

		// const isProd = process.env.NODE_ENV === "production";
		const SESSION_COOKIE_SECRET = process.env.SESSION_COOKIE_SECRET;
		if (!SESSION_COOKIE_SECRET)
			throw new Error("SESSION_COOKIE_SECRET must be set in the .env file!");
		const isHTTPS = this.httpsServerOptions !== undefined;
		this.app.use(
			session.default({
				secret: SESSION_COOKIE_SECRET,
				resave: false,
				saveUninitialized: false,
				store: sessionStore,
				cookie: {
					sameSite: isHTTPS ? "strict" : "lax",
					httpOnly: true,
					secure: isHTTPS,
					maxAge: 2 * 60 * 60 * 1000,
				},
			}),
		);
	}

	private setHttpsServerOptions() {
		const TLS_KEY_PATH = process.env.TLS_KEY_PATH;
		const TLS_CERT_PATH = process.env.TLS_CERT_PATH;

		try {
			if (TLS_KEY_PATH && TLS_CERT_PATH) {
				const key = fs.readFileSync(TLS_KEY_PATH);
				const cert = fs.readFileSync(TLS_CERT_PATH);

				this.httpsServerOptions = {
					key,
					cert,
				};
			} else {
				console.log(
					textColor(
						"lightyellow",
						"TLS_KEY_PATH and TLS_CERT_PATH must be set in the .env file. Starting HTTP server instead.",
					),
				);
			}
		} catch (error) {
			console.error("Failed to load key or certificate! : ", error);
		}
	}
}
