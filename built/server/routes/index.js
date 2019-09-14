"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
class IndexRoute extends route_1.BaseRoute {
    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    static create(router) {
        //log
        console.log("[IndexRoute::create] Creating index route.");
        //add home page route
        router.get("/", (req, res, next) => {
            new IndexRoute().index(req, res, next);
        });
    }
    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
    }
    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    index(req, res, next) {
        //set custom title
        this.title = "Home | Tasklist app";
        //set options
        const options = {
            "message": "Welcome to Tasklist app",
            "pageTitle": "Main page"
        };
        this.render(req, res, "index", options);
    }
}
exports.IndexRoute = IndexRoute;
//# sourceMappingURL=index.js.map