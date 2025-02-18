import * as process from "node:process";
import * as path from "node:path";
import * as dotenv from 'dotenv';

let config;

if (process.env.NODE_ENV === "local") {
	config = dotenv.config({
		path: path.resolve(process.cwd(), ".env"),
	});
} else {
	config = dotenv.config({
		path: path.resolve(process.cwd(), ".env." + process.env.NODE_ENV),
	});
}

export default Object.freeze(config.parsed);
