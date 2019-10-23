import { Document, model, Model } from "mongoose";
import { IPlanDocument, IPlanObject} from "../interfaces/plan";
import { IUserObject } from "../interfaces/user";
import { PlanSchema } from "../schemas/plan";


export interface IPlan extends  IPlanDocument {
    futureMember: string
}

export interface IPlanModel extends Model<IPlan> {

}

export const Plan = model<IPlan, IPlanModel>("Plan", PlanSchema);

