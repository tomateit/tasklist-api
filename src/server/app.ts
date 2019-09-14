import express = require("express");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import pug = require("pug");
import path = require("path");
import errorHandler = require("errorhandler");
import mongoose = require("mongoose");

//routes
import { IndexRoute } from "./routes/client";

//interfaces
import { IUser } from "./interfaces/user";

//models
import { IModel } from "./models/model";
import { IUserModel } from "./models/user";

//schemas
import { UserSchema } from "./schemas/user";
import { isUndefined } from "util";

export default class AppServer {

	public static bootstrap(): AppServer {
		return new AppServer();
	}

	public app: express.Application;

	private model: IModel;

	constructor() {
		//instance defaults
		this.model = Object(); //initialize this to an empty object

		//create expressjs application
		this.app = express();
	
		//configure application
		this.config();
	
		//add routes
		this.routes();
	
		//add api
		this.api();
	}

	public config() {

		
		this.app.use(logger("dev"));
		this.app.use(express.static(path.join(__dirname, "..", "..", "public")));
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
		this.app.use(cookieParser("SECRET_GOES_HERE"));
		
		//---------TEMPLATE ENGINE SETUP -------
		this.app.set("view engine", "pug");
		this.app.set("views", path.join(__dirname,"..", "..","views"));
		
		this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
			err.status = 404;
			next(err);
		});

		const MONGODB_CONNECTION_ENV: string | undefined = process.env.MONGODB_URI;
		let MONGODB_CONNECTION: string;
		if(isUndefined(MONGODB_CONNECTION_ENV)) {
			throw new Error("NO MONGODB CONNECTION PROVIDED")
		}
		MONGODB_CONNECTION = MONGODB_CONNECTION_ENV;

		const connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
		this.model.user = connection.model<IUserModel>("User", UserSchema);

		//error handling
		this.app.use(errorHandler());
	}

	public api() {
		return ;
	}

	/**
	 * Create router.
	 *
	 * @class Server
	 * @method config
	 * @return void
	 */
	private routes() {
		let router: express.Router;
		router = express.Router();

		IndexRoute.create(router);
		this.app.use(router);
	}
}
