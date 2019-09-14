import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";


export class LoginRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class LoginRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
      console.log("[LoginRoute::create] Creating login route.");
  
      //add login page route
      router.get("/login", (req: Request, res: Response, next: NextFunction) => {
        new LoginRoute().loginPage(req, res, next);
      });
    }
  
    /**
     * Constructor
     *
     * @class LoginRoute
     * @constructor
     */
    constructor() {
      super();
    }
  
    /**
     * The home page route.
     *
     * @class LoginRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public loginPage(req: Request, res: Response, next: NextFunction) {
      //set custom title
      this.title = "Login | Tasklist app";
  
      //set options
      const options: object = {
        "message": "Get access to your own todos!",
        "pageTitle": "Login"
      };
  
    
      this.render(req, res, "login", options);
    }
  }