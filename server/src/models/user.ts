import { sequelize } from ".";
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: CreationOptional<number>;
	declare firstName: string;
	declare lastName: string;
	declare email: string;
	declare hash: string;
	declare salt: string;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		firstName: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		lastName: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		email: {
			type: new DataTypes.STRING(128),
			allowNull: false,
			unique: true,
		},
		salt: {
			type: new DataTypes.STRING(255),
			allowNull: false,
		},
		hash: {
			type: new DataTypes.STRING(255),
			allowNull: false,
		},
	},
	{
		tableName: "users",
		sequelize,
		defaultScope: {
			attributes: { exclude: ["hash", "salt"] },
		},
		scopes: {
			withHashAndSalt: {
				attributes: { include: ["hash", "salt"] },
			},
		},
	},
);
