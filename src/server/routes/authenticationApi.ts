import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { IAuthenticationRequestBody } from "../interfaces/authenticationRequestBody";
import { User, IUser, IUserModel } from "../models/user";
import { IUserDocument } from "../interfaces/user";
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
  
      //add login page route
      router.post("/users", (req: Request, res: Response, next: NextFunction) => {
        new AuthenticationRoute().authenticate(req, res, next);
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
     * The login page route.
     *
     * @class AuthenticationRoute
     * @method authenticate
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async authenticate(req: Request, res: Response, next: NextFunction) {
        const authnticationBody: IAuthenticationRequestBody = req.body;

        try {
            const token: string = await User.authenticateUser(authnticationBody);
            
            const user: IUser = await User.findByToken(token);
            
            return res.send(user.toJSON())
            
        } catch(error) {
            console.error(error)
            if (error.message === "USERNOTFOUND") {
                return res.status(404).send({error: "USERNOTFOUND"});
            }
            return next(error)
        }
    }
  }