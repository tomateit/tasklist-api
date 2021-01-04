import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { Zone } from "../models/Zone";
import { UserAction } from "../types/User";
import { authorize } from "../middleware/authorize";
import { authenticate } from "../middleware/authenticate";
import _logger from "../utils/logger";

const logger = _logger({"source": "zones_api"})

export class ZonesApiRoute extends BaseRoute {

    /**
     *
     * @class ZonesApiRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        console.log("[ZonesApi::create] Zones API enabled.");

        router.get("/zone/:id", authenticate, authorize(UserAction.getZone), (req: Request, res: Response, next: NextFunction) => {
            new ZonesApiRoute().getZone(req, res, next);
        });

        router.get("/zone", authenticate, authorize(UserAction.getAllZones), (req: Request, res: Response, next: NextFunction) => {
            new ZonesApiRoute().getAllZones(req, res, next);
        });
    
        router.post("/zone", authenticate, authorize(UserAction.createZone), (req: Request, res: Response, next: NextFunction) => {
            new ZonesApiRoute().createZone(req, res, next);
        });

        router.put("/zone/:id", authenticate, authorize(UserAction.updateZone), (req: Request, res: Response, next: NextFunction) => {
            new ZonesApiRoute().updateZone(req, res, next);
        });

        router.delete("/zone/:id", authenticate, authorize(UserAction.deleteZone), (req: Request, res: Response, next: NextFunction) => {
            new ZonesApiRoute().deleteZone(req, res, next);
        });

      
    }
  
    /**
     * Constructor
     *
     * @class ZonesApiRoute
     * @constructor
     */
    constructor() {
      super();
    }
  

    /**
     * The route finds a zone with specified id and sends it back
     * @class ZonesApiRoute
     * @method getZone
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async getZone(req: Request, res: Response, next: NextFunction) {
        const zone = await Zone.findById(req.params.id);
        res.send(zone)
    }

    /**
     * The route responds with all zones available to request author.
     * @class ZonesApiRoute
     * @method getAllZones
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async getAllZones(req: Request, res: Response, next: NextFunction) {
        const activitiesOfSomeone = await Zone.find({author: res.locals.user.id});
        res.send(activitiesOfSomeone)
    }

    /**
     * The route creates new zone
     * sends created zone back
     * @class ZonesApiRoute
     * @method createZone
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async createZone(req: Request, res: Response, next: NextFunction) {
        const newZone = await new Zone(req.body).save()
        res.send(newZone)
    }

    /**
     * The route that updates a zone
     * replaces existing zone with provided one
     * All top level update keys which are not atomic operation names are treated as $set operations
     * @class ZonesApiRoute
     * @method updateZone
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async updateZone(req: Request, res: Response, next: NextFunction) {
        const updatedZone = await Zone.findByIdAndUpdate(req.params.id, req.body)
        res.send(updatedZone)
    }

    /**
     * The route that deletes a zone
     * Completely deletes existing zone and sends it back
     * @class ZonesApiRoute
     * @method deleteZone
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public async deleteZone(req: Request, res: Response, next: NextFunction) {
        const deletedZone = await Zone.findByIdAndDelete(req.params.id)
        res.send(deletedZone)
    }
}