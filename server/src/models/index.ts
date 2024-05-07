import { Sequelize } from "sequelize";

import db from "../config/db";

export const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
	port: parseInt(db.PORT),
	host: db.HOST,
	dialect: db.dialect,
	pool: db.pool,
});
