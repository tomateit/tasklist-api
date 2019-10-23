import express = require("express");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import pug = require("pug");
import path = require("path");
import errorHandler = require("errorhandler");
import mongoose = require("mongoose");

//routes
import { IndexRoute } from "./routes";
import { LoginRoute } from "./routes/login";
import { AuthenticationRoute } from "./routes/authenticationApi";


import { isUndefined } from "util";
import { PlansApiRoute } from "./routes/plansApi";
import { GoalsApiRoute } from "./routes/goalsApi";

export default class AppServer {

	public static bootstrap(): AppServer {
		return new AppServer();
	}

	public app: express.Application;

	// private model: IModel;

	constructor() {
		//instance defaults
		// this.model = Object(); //initialize this to an empty object

		//create expressjs application
		this.app = express();
	
		//configure application
		this.config();
	
		// connect to db
		this.dbsetup();
		//add routes
		this.routes();
	
		//add api
		this.api();
	}

	public async config() {

		//---------THIRD-PARTY SETUP -------
		this.app.use(logger("dev"));
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
		this.app.use(cookieParser("SECRET_GOES_HERE"));

		this.app.use(express.static(path.join(__dirname, "..", "..", "public")));
		
		//---------TEMPLATE ENGINE SETUP -------
		this.app.set("view engine", "pug");
		this.app.set("views", path.join(__dirname,"..", "..","views"));
		
		

		//error handling
		this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
			err.status = 404;
			next(err);
		});
		this.app.use(errorHandler());

	}

	public async dbsetup() {
		//---------MONGO DB SETUP -------
		const MONGODB_CONNECTION_ENV: string | undefined = process.env.MONGODB_URI;
		let MONGODB_CONNECTION_STRING: string;

		if(isUndefined(MONGODB_CONNECTION_ENV)) {
			throw new Error("NO MONGODB CONNECTION PROVIDED")
		}
		MONGODB_CONNECTION_STRING = MONGODB_CONNECTION_ENV;
	
		mongoose.connection.on("connecting", () => {
			console.log("Connecting to db...")
		})
		
		mongoose.connection.on("connected", () => {
			console.log("Successfully connected to db.")
		})
		
		mongoose.connection.on("error", (error) => {
			console.error("DB connection failure:", error)
		})
		
		await mongoose.connect(MONGODB_CONNECTION_STRING, {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("Listing collections: ", mongoose.connection.modelNames())

		// this.model.user = connection.model<IUserModel>("User", UserSchema);
	}

	public api() {
		let router: express.Router;
		router = express.Router();

		AuthenticationRoute.create(router);

		this.app.use(router);
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
		LoginRoute.create(router);
		PlansApiRoute.create(router);
		GoalsApiRoute.create(router);

		this.app.use(router);
	}
}
