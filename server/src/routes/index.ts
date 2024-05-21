import Express from "express";
import Path from "path";

import authRoutes from "./auth";
import userRoutes from "./user";
import srcDir from "../util/srcPath";

export const initRoutes = (app: Express.Application) => {
	app.use("/api/auth", authRoutes);
	app.use("/api/user", userRoutes);

	if (process.env.NODE_ENV === "production") {
		app.get("*", (req, res) => {
			res.sendFile(Path.resolve(srcDir, "../build", "index.html"), (error) => {
				if (error) {
					console.error("Error sending index.html:", error);
					res.status(500).send("Error sending file!");
				}
			});
		});
	}
};
