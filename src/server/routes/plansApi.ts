import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { authorize } from "../middleware/authorize";
import { authenticate } from "../middleware/authenticate";
import { Plan, IPlan, IPlanModel } from "../models/plan";
import { IPlanDocument, IPlanObject } from "../interfaces/plan";
import { UserAction } from "../types/userActions";


export class PlansApiRoute extends BaseRoute {

    /**
     *
     * @class PlansApiRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log("[PlansApi::create] Plans API enabled.");

        router.get("/plans/:id",authenticate, authorize(UserAction.getOnePlan), (req: Request, res: Response, next: NextFunction) => {
            new PlansApiRoute().getOnePlan(req, res, next);
        });

        router.get("/plans", authenticate, authorize(UserAction.getAllPlans), (req: Request, res: Response, next: NextFunction) => {
            new PlansApiRoute().getAllPlans(req, res, next);
        });

        router.post("/plans", authenticate, authorize(UserAction.createPlan), (req: Request, res: Response, next: NextFunction) => {
            new PlansApiRoute().createPlan(req, res, next);
        });

        router.put("/plans", authenticate, authorize(UserAction.updatePlan), (req: Request, res: Response, next: NextFunction) => {
            new PlansApiRoute().updatePlan(req, res, next);
        });

        router.delete("/plans", authenticate, authorize(UserAction.deletePlan), (req: Request, res: Response, next: NextFunction) => {
            new PlansApiRoute().deletePlan(req, res, next);
        });
    }

    /**
     * Constructor
     *
     * @class PlansApiRoute
     * @constructor
     */
    constructor() {
        super();
    }


    /**
     * The route finds a plan with specified id and sends it back
     * @class PlansApiRoute
     * @method getPlan
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async getOnePlan(req: Request, res: Response, next: NextFunction) {
        const plan = await Plan.findById(req.params.id);
        res.send(plan)
    }

    /**
     * The route responds with all plans available to request author.
     * @class PlansApiRoute
     * @method getAllPlans
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async getAllPlans(req: Request, res: Response, next: NextFunction) {
        const plansOfSomeone = await Plan.find({author: res.locals.user.id});
        res.send(plansOfSomeone)
    }

    /**
     * The route creates new plan
     * sends created plan back
     * @class PlansApiRoute
     * @method createPlan
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async createPlan(req: Request, res: Response, next: NextFunction) {
        const newPlan = await new Plan(req.body).save()
        res.send(newPlan)
    }

    /**
     * The route that updates a plan
     * replaces existing plan with provided one
     * All top level update keys which are not atomic operation names are treated as $set operations
     * @class PlansApiRoute
     * @method updatePlan
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async updatePlan(req: Request, res: Response, next: NextFunction) {
        const updatedPlan = await Plan.findByIdAndUpdate(req.body._id, req.body)
        res.send(updatedPlan)
    }

    /**
     * The route that deletes a plan
     * Completely deletes existing plan and sends it back
     * @class PlansApiRoute
     * @method authenticate
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async deletePlan(req: Request, res: Response, next: NextFunction) {
        const deletedPlan = await Plan.findByIdAndDelete(req.body._id )
        res.send(deletedPlan)
    }
}