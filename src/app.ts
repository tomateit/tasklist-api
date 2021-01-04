import express = require("express");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import httplogger = require("morgan");
import path = require("path");
// import errorHandler = require("errorhandler");
import {dbConnect} from "./db/db"

//routes
import { IndexRoute } from "./routes";
import { AuthenticationRoute } from "./routes/authenticationApi";

import { UsersApiRoute } from "./routes/usersApi";
import { ActivitiesApiRoute } from "./routes/activitiesApi";
import { ZonesApiRoute } from "./routes/zonesApi";
import _logger from "./utils/logger";

const logger = _logger({"source": "app"})


export default class AppServer {

	public static bootstrap(): AppServer {
		return new AppServer();
	}

	public app: express.Application;

	// private model: IModel;

	constructor() {
		//create expressjs application
		this.app = express();
	
		//add api
		this.api();
	}

	public async config() {

		await dbConnect();
		//---------THIRD-PARTY SETUP -------
		this.app.use(httplogger("dev"));
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(cookieParser("SECRET_GOES_HERE"));

		//error handling
		this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
			err.status = 404;
			next(err);
		});
		// this.app.use(errorHandler());

	}

	public api() {
		let router: express.Router;
		router = express.Router();

		// AuthenticationRoute.create(router);
		// UsersApiRoute.create(router);
		ActivitiesApiRoute.create(router);
		ZonesApiRoute.create(router);

		this.app.use(router);
	}

}
