import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { IAuthenticationRequestBody } from "../types/Requests";
// import { ISignupRequestBody } from "../types/signupRequestBody";
import { User, IUserDocument } from "../models/User";
// import { IUserDocument } from "../types/user";


export class AuthenticationRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class AuthenticationRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
      console.log("[AuthenticationApi::create] Authentication API enabled.");
  
      //that should be patch route but html forms have no support of that
      router.post("/users", (req: Request, res: Response, next: NextFunction) => {
        new AuthenticationRoute().authenticate(req, res, next);
      });

      router.post("/users/new", (req: Request, res: Response, next: NextFunction) => {
        new AuthenticationRoute().createUser(req, res, next);
      });

      
    }
  
    /**
     * Constructor
     *
     * @class AuthenticationRoute
     * @constructor
     */
    constructor() {
      super();
    }
  
    /**
     * The authentication route.
     * Performs authentication of existing user
     * @class AuthenticationRoute
     * @method authenticate
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async authenticate(req: Request, res: Response, next: NextFunction) {
        const authnticationBody: IAuthenticationRequestBody = req.body;
        //TODO Shall redirect to account page if ?redirect=true
        try {
            const token: string = await User.authenticateUser(authnticationBody);
            
            const user: IUserDocument = await User.findByToken(token);
            req.app.locals.user = user;
            res.set("X-Auth", token);
            if (req.query.redirect) {
              return res.redirect(req.query.redirect)
            } else {
              return res.send(user.toJSON())
            }
            
            
        } catch(error) {
            console.error(error)
            // TODO in case of error pass error message through options to render a template
            if (error.message === "USERNOTFOUND") {
                return res.status(404).send({error: "USERNOTFOUND"});
            } else if (error.message === "PASSWORDNOTMATCH") {
                return res.status(400).send({error: "PASSWORDNOTMATCH"});
            }
            return next(error)
        }
    }

    /**
     * The authentication route.
     * Performs authentication of existing user
     * @class AuthenticationRoute
     * @method authenticate
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async createUser(req: Request, res: Response, next: NextFunction) {
      const signupBody: ISignupRequestBody = req.body;
      //TODO Shall redirect to account page if ?redirect=true
      try {
          const token: string = await User.createNewUser(signupBody);
          
          const user: IUserDocument = await User.findByToken(token);
          res.locals.user = user;
          res.set("X-Auth", token);
          if (req.query.redirect) {
            return res.redirect(req.query.redirect)
          } else {
            return res.send(user.toJSON())
          }
          
          
      } catch(error) {
          console.error(error)
          
          return next(error)
      }
  }
}