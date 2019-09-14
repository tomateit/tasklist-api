"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorhandler");
const mongoose = require("mongoose");
//routes
const routes_1 = require("./routes");
const login_1 = require("./routes/login");
//schemas
const user_1 = require("./schemas/user");
const util_1 = require("util");
class AppServer {
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
    static bootstrap() {
        return new AppServer();
    }
    config() {
        this.app.use(logger("dev"));
        this.app.use(express.static(path.join(__dirname, "..", "..", "public")));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser("SECRET_GOES_HERE"));
        //---------TEMPLATE ENGINE SETUP -------
        this.app.set("view engine", "pug");
        this.app.set("views", path.join(__dirname, "..", "..", "views"));
        this.app.use((err, req, res, next) => {
            err.status = 404;
            next(err);
        });
        const MONGODB_CONNECTION_ENV = process.env.MONGODB_URI;
        let MONGODB_CONNECTION;
        if (util_1.isUndefined(MONGODB_CONNECTION_ENV)) {
            throw new Error("NO MONGODB CONNECTION PROVIDED");
        }
        MONGODB_CONNECTION = MONGODB_CONNECTION_ENV;
        const connection = mongoose.createConnection(MONGODB_CONNECTION, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        this.model.user = connection.model("User", user_1.UserSchema);
        //error handling
        this.app.use(errorHandler());
    }
    api() {
        return;
    }
    /**
     * Create router.
     *
     * @class Server
     * @method config
     * @return void
     */
    routes() {
        let router;
        router = express.Router();
        routes_1.IndexRoute.create(router);
        login_1.LoginRoute.create(router);
        this.app.use(router);
    }
}
exports.default = AppServer;
//# sourceMappingURL=app.js.map