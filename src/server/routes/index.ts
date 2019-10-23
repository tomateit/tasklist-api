import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";


export class IndexRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[IndexRoute::create] Creating index route.");

    //add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
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
  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Home | the app";

    //set options
    
    res.locals.user = req.app.locals.user;
    
    if (res.locals.user) {
      const options: object = Object.assign({
        "authenticated": true,
        "message": "Welcome to the app",
        "pageTitle": `${res.locals.user.username}'s plans`,
      }, res.locals);
      this.render(req, res, "home", options);
    } else {
      const options: object = {
        "authenticated": false,
        "message": "Welcome to the app",
        "pageTitle": "Main page",
      };
      this.render(req, res, "landing", options);
    }
  
  }
}