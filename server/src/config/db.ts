import textColor from "../util/consoleTextColor";

class DbConfig {
	public dbConfig;

	constructor() {
		this.dbConfig = this.loadAndValidateConfig();
	}

	private loadAndValidateConfig() {
		const config = {
			HOST: process.env.DB_HOST!,
			USER: process.env.DB_USER!,
			PASSWORD: process.env.DB_PASSWORD!,
			DB: process.env.DB_DATABASE!,
			PORT: process.env.DB_PORT!,
			dialect: "mysql" as "mysql",
			pool: {
				max: 5,
				min: 0,
				acquire: 60000,
				idle: 10000,
			},
		};

		if (!config.HOST || !config.USER || !config.PASSWORD || !config.DB || !config.PORT) {
			const errorMessage =
				"Database settings are required. Please enter the detailed DB information in the .env file.";
			console.error(textColor("lightred", `\nError : ${errorMessage}\n`));
			throw new Error(errorMessage);
		}

		return config;
	}
}

const dbConfig = new DbConfig().dbConfig;
export default dbConfig;
