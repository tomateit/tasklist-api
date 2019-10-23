import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { Goal, IGoal, IGoalModel } from "../models/goal";
import { IGoalDocument } from "../interfaces/goal";
import { UserAction } from "../types/userActions";
import { authorize } from "../middleware/authorize";
import { authenticate } from "../middleware/authenticate";

export class GoalsApiRoute extends BaseRoute {

    /**
     *
     * @class GoalsApiRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log("[GoalsApi::create] Goals API enabled.");

        router.get("/goals/:id", authenticate, authorize(UserAction.getOneGoal), (req: Request, res: Response, next: NextFunction) => {
            new GoalsApiRoute().getOneGoal(req, res, next);
        });

        router.get("/goals", authenticate, authorize(UserAction.getAllGoals), (req: Request, res: Response, next: NextFunction) => {
            new GoalsApiRoute().getAllGoals(req, res, next);
        });
    
        router.post("/goals", authenticate, authorize(UserAction.createPlan), (req: Request, res: Response, next: NextFunction) => {
            new GoalsApiRoute().createGoal(req, res, next);
        });

        router.put("/goals", authenticate, authorize(UserAction.updateGoal), (req: Request, res: Response, next: NextFunction) => {
            new GoalsApiRoute().updateGoal(req, res, next);
        });

        router.delete("/goals", authenticate, authorize(UserAction.deleteGoal), (req: Request, res: Response, next: NextFunction) => {
            new GoalsApiRoute().deleteGoal(req, res, next);
        });

      
    }
  
    /**
     * Constructor
     *
     * @class GoalsApiRoute
     * @constructor
     */
    constructor() {
      super();
    }
  

    /**
     * The route finds a goal with specified id and sends it back
     * @class GoalsApiRoute
     * @method getGoal
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async getOneGoal(req: Request, res: Response, next: NextFunction) {
        const goal = await Goal.findById(req.params.id);
        res.send(goal)
    }

    /**
     * The route responds with all goals available to request author.
     * @class GoalsApiRoute
     * @method getAllGoals
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async getAllGoals(req: Request, res: Response, next: NextFunction) {
        const goalsOfSomeone = await Goal.find({author: res.locals.user.id});
        res.send(goalsOfSomeone)
    }

    /**
     * The route creates new goal
     * sends created goal back
     * @class GoalsApiRoute
     * @method createGoal
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async createGoal(req: Request, res: Response, next: NextFunction) {
        const newGoal = await new Goal(req.body).save()
        res.send(newGoal)
    }

    /**
     * The route that updates a goal
     * replaces existing goal with provided one
     * All top level update keys which are not atomic operation names are treated as $set operations
     * @class GoalsApiRoute
     * @method updateGoal
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async updateGoal(req: Request, res: Response, next: NextFunction) {
        const updatedGoal = await Goal.findByIdAndUpdate(req.body._id, req.body)
        res.send(updatedGoal)
    }

    /**
     * The route that deletes a goal
     * Completely deletes existing goal and sends it back
     * @class GoalsApiRoute
     * @method authenticate
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async deleteGoal(req: Request, res: Response, next: NextFunction) {
        const deletedGoal = await Goal.findByIdAndDelete(req.body._id )
        res.send(deletedGoal)
    }
}