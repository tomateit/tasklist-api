import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { Activity } from "../models/Activity";
import { UserAction } from "../types/User";
import { authorize } from "../middleware/authorize";
import { authenticate } from "../middleware/authenticate";
import _logger from "../utils/logger";

const logger = _logger({"source": "activity_api"})

export class ActivitiesApiRoute extends BaseRoute {

    /**
     *
     * @class ActivitiesApiRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log("[ActivitiesApi::create] Activities API enabled.");

        router.get("/activity/:id", authenticate, authorize(UserAction.getActivity), (req: Request, res: Response, next: NextFunction) => {
            new ActivitiesApiRoute().getActivity(req, res, next);
        });

        router.get("/activity", authenticate, authorize(UserAction.getAllActivities), (req: Request, res: Response, next: NextFunction) => {
            new ActivitiesApiRoute().getAllActivities(req, res, next);
        });
    
        router.post("/activity", authenticate, authorize(UserAction.createActivity), (req: Request, res: Response, next: NextFunction) => {
            new ActivitiesApiRoute().createActivity(req, res, next);
        });

        router.put("/activity/:id", authenticate, authorize(UserAction.updateActivity), (req: Request, res: Response, next: NextFunction) => {
            new ActivitiesApiRoute().updateActivity(req, res, next);
        });

        router.delete("/activity/:id", authenticate, authorize(UserAction.deleteActivity), (req: Request, res: Response, next: NextFunction) => {
            new ActivitiesApiRoute().deleteActivity(req, res, next);
        });

      
    }
  
    /**
     * Constructor
     *
     * @class ActivitiesApiRoute
     * @constructor
     */
    constructor() {
      super();
    }
  

    /**
     * The route finds a activity with specified id and sends it back
     * @class ActivitiesApiRoute
     * @method getActivity
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async getActivity(req: Request, res: Response, next: NextFunction) {
        const activity = await Activity.findById(req.params.id);
        res.send(activity)
    }

    /**
     * The route responds with all activitys available to request author.
     * @class ActivitiesApiRoute
     * @method getAllActivities
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async getAllActivities(req: Request, res: Response, next: NextFunction) {
        const activitiesOfSomeone = await Activity.find({author: res.locals.user.id});
        res.send(activitiesOfSomeone)
    }

    /**
     * The route creates new activity
     * sends created activity back
     * @class ActivitiesApiRoute
     * @method createActivity
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async createActivity(req: Request, res: Response, next: NextFunction) {
        const newActivity = await new Activity(req.body).save()
        res.send(newActivity)
    }

    /**
     * The route that updates a activity
     * replaces existing activity with provided one
     * All top level update keys which are not atomic operation names are treated as $set operations
     * @class ActivitiesApiRoute
     * @method updateActivity
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async updateActivity(req: Request, res: Response, next: NextFunction) {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body)
        res.send(updatedActivity)
    }

    /**
     * The route that deletes a activity
     * Completely deletes existing activity and sends it back
     * @class ActivitiesApiRoute
     * @method deleteActivity
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async deleteActivity(req: Request, res: Response, next: NextFunction) {
        const deletedActivity = await Activity.findByIdAndDelete(req.params.id)
        res.send(deletedActivity)
    }
}