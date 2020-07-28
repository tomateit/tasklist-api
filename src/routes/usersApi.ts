import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { User } from "../models/User";
import { UserAction } from "../types/User";
import { authorize } from "../middleware/authorize";
import { authenticate } from "../middleware/authenticate";

export class UsersApiRoute extends BaseRoute {

    /**
     *
     * @class UsersApiRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log("[UsersApi::create] Users API enabled.");

        router.get("/user/:id", authenticate, authorize(UserAction.getUser), (req: Request, res: Response, next: NextFunction) => {
            new UsersApiRoute().getUser(req, res, next);
        });

        router.get("/user", authenticate, authorize(UserAction.getAllUsers), (req: Request, res: Response, next: NextFunction) => {
            new UsersApiRoute().getAllUsers(req, res, next);
        });
    
        router.post("/user", authenticate, authorize(UserAction.createUser), (req: Request, res: Response, next: NextFunction) => {
            new UsersApiRoute().createUser(req, res, next);
        });

        router.put("/user/:id", authenticate, authorize(UserAction.updateUser), (req: Request, res: Response, next: NextFunction) => {
            new UsersApiRoute().updateUser(req, res, next);
        });

        router.delete("/user/:id", authenticate, authorize(UserAction.deleteUser), (req: Request, res: Response, next: NextFunction) => {
            new UsersApiRoute().deleteUser(req, res, next);
        });

      
    }
  
    /**
     * Constructor
     *
     * @class UsersApiRoute
     * @constructor
     */
    constructor() {
      super();
    }
  

    /**
     * The route finds a user with specified id and sends it back
     * @class UsersApiRoute
     * @method getUser
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async getUser(req: Request, res: Response, next: NextFunction) {
        const user = await User.findById(req.params.id);
        res.send(user)
    }

    /**
     * The route responds with all users available to request author.
     * @class UsersApiRoute
     * @method getAllUsers
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        const activitiesOfSomeone = await User.find({author: res.locals.user.id});
        res.send(activitiesOfSomeone)
    }

    /**
     * The route creates new user
     * sends created user back
     * @class UsersApiRoute
     * @method createUser
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async createUser(req: Request, res: Response, next: NextFunction) {
        const newUser = await new User(req.body).save()
        res.send(newUser)
    }

    /**
     * The route that updates a user
     * replaces existing user with provided one
     * All top level update keys which are not atomic operation names are treated as $set operations
     * @class UsersApiRoute
     * @method updateUser
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async updateUser(req: Request, res: Response, next: NextFunction) {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
        res.send(updatedUser)
    }

    /**
     * The route that deletes a user
     * Completely deletes existing user and sends it back
     * @class UsersApiRoute
     * @method deleteUser
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.send(deletedUser)
    }
}